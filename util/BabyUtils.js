module.exports = {


    getImages(files) {
        if (files.length === 0) {
            return null
        }

        const images = []

        files.forEach(file => {
            images.push("http://39.108.227.137:3000/images/loves/" + file.filename)
        })

        return JSON.stringify(images)
    }
}
