const songModel = require("../model/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");  // id3 ko import kiya {if you don't know about this go to CLassNotes.md file}

async function uploadSong(req, res) {
    // console.log(req.file)  // yaha multer hume file ka buffer de rha hai.
    const songBuffer = req.file.buffer;
    const { mood } =req.body;
    const tags = id3.read(songBuffer);  // id3 uss buffer ko read kr rha hai.
    // console.log(tags) // id3 ne uss buffer ki sari details pd kr log kr diya.

    // const songFile = await storageService.uploadFile({    // Yaha pr pehle song ki file upload ho rhi hai imagekit pr then poster upload ho rha hai, and inhe upload hone me lgbhag 3-3.5 seconds lg rhe hai. hm time km kr skte hai thoda sa optimization kr ke Neeche kiya hai mene..
    //     buffer: songBuffer,
    //     fileName: tags.title,
    //     folder: "/cohort-2/moodify/songs"
    // })

    // const posterFile = await storageService.uploadFile({
    //     buffer : tags.image.imageBuffer,
    //     fileName : tags.title + ".jpeg",
    //     folder: "/cohort-2/moodify/posters"
    // })

    const [songFile, posterFile] = await Promise.all([  // ab hmne Promise.all ka use krke dono files ko ek sath upload kr diya, isse time km lgta hai. ab 1-1.5 seconds lgenge bss.
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: tags.title,
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer : tags.image.imageBuffer,
            fileName : tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood})

    res.status(201).json({
        message: "Song created successfully",
        song
    })

}

async function getSong(req, res) {
    const {mood} = req.query;
    const songs = await songModel.findOne({mood});
    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    })
}

module.exports = { uploadSong, getSong }