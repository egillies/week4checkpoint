export class Image {
    constructor(data) {
        this.id = data._id || ''

        this.largeImgUrl = data.largeImgUrl

    }

    get DetailsTemplate() {
        return `
      <div id="imageDetails">
      </div>
        `
    }
}

