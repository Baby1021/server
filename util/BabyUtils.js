module.exports = {


    getImages(files) {
        if (files.length === 0) {
            return null
        }

        const images = []

        files.forEach(file => {
            images.push("http://39.108.227.137:8000/images/" + file.filename)
        })

        return JSON.stringify(images)
    }
}
