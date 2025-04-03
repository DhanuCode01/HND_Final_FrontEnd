import { createClient } from "@supabase/supabase-js"


const anon_key=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlc2xrZnRwb2RtZXhlcnN1dm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzOTY0MjQsImV4cCI6MjA1ODk3MjQyNH0.pV61SKvsgm16vUjnDi7e3Brod06fj-8QVl4c1zVjnIg`   //your Superbase (API KEY)
const superbase_URL=`https://xeslkftpodmexersuvnw.supabase.co`   //your superbase (project URL)

const superbase=createClient(superbase_URL,anon_key)     //create connection to superBase

export default function MediaUpload(file){                  //create function to upload file to database (First you upload the file in the function )

        return new Promise((resolve,reject)=>{       //use promisees reuserble function

        if(file == null){                           //If there is no file
            reject("NO File Selected ")
        }

                /* 1st way     //Upload the file with the unique.
            const names=file.name.split(".");         //filter file extention "used dot"
            const timestamp=new Date().getTime();       //get now time
            const fileName=names+timestamp */

            //    2nd way     //Upload the file with the unique.
            const timestamp=new Date().getTime();       //get now time
            const fileName=timestamp+file.name




            superbase.storage.from("itemsimages").upload(fileName,file,{     //"images"= bucket name  ,   //file.name=The name under which the image in the super base should be saved     ,       //file=The file obtained for upload
                cacheControl:'3600',
                upsert:false,
            }).then(()=>{                       //is successed

                const publicURL=superbase.storage.from("itemsimages").getPublicUrl(fileName).data.publicUrl;          //get uploaded image URL
                resolve(publicURL);
            }).catch(()=>{                  //is not successed
                reject("ERROR File Selected ")
            })

    })
    
  
}