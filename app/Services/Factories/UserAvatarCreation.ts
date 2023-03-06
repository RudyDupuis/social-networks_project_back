import { Attachment } from "@ioc:Adonis/Addons/AttachmentLite"
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'

export default class UserAvatarCreation {
    public async create() {

        // créating the fake image's properties
        const avatar = new Attachment({
            extname: 'png',
            mimeType: 'image/png',
            size: 10 * 1000,
            name: `test.png`,
        })
    
        // Mark image as persisted, this will disable the
        // functions of attachment lite that looks for multipart
        // body and attempts to write the file from the stream
        avatar.isPersisted = true
    
        // Persist the file using Drive
        await Drive.put(avatar.name, (await file.generatePng('1mb')).contents)

        return avatar
    }
}