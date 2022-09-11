import {helloWorld} from './test';
import { register } from './Components';

(async () => {

    register();
    const root = document.getElementById('root');
    if(!root){
        console.log('no root element found');
        return;
    }

    // console.log(_.camelCase("hello world"));
    helloWorld();
    const form = document.forms.namedItem("upload-form");

    if(form === null){
        console.log("no form found");
        return;
    }


    form.addEventListener(
        "submit",
        async (event) => {
            const formData = new FormData(form);
            formData.append("CustomField", "This is some extra data");

            event.preventDefault();
            const response = await fetch("/weatherforecast",
                {
                    body: formData,
                    method: "POST",
                });
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            const blob = await response.blob();
            // const myImage = document.querySelector(".my-image") as HTMLImageElement | null;
            const myImage = document.createElement('img') as HTMLImageElement;
            root.append(myImage);
            const prefix = "data:image/png;base64";
            const txt =await blob.text();
            if(myImage !==null){
                myImage.src = `${prefix}, ${txt}`;
            }
        },
        false
    );
})();
