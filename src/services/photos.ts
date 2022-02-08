
import { storage } from './storage'
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';


type Photo = {
    name: string;
    url: Array<string>;
}



export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images");
    const photoList = await listAll(imagesFolder);

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);
        
        //list.push({
        //    name: photoList.items[i].name,
        //    url: photoUrl
        //});
    }

    return list;
}

export const insert = async (image: Express.Multer.File, name: string) => {
    
        if(image) {
            if(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(image.mimetype)) {

                const newFile = ref(storage, `images/${name}`);
                const metadata = {
                    contentType: image.mimetype.toString()
                }

                const upload = await uploadBytes(newFile, image.buffer, metadata);
                const photoUrl = await getDownloadURL(upload.ref); 

                return photoUrl
            }
        }  
    
}


export const deletePhoto = async (name: string) => {

    let photoRef = ref(storage, name);
  
    await deleteObject(photoRef);
    

}

