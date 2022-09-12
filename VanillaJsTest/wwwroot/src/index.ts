import {helloWorld} from './test';
import { register, PageViewerV2 } from './Components';

async function formSubmitHandler(event: SubmitEvent){
    const form = event.target as HTMLFormElement;
    // const form = document.forms.namedItem("upload-form");
    // if(!form){
    //     return;
    // }
    const formData = new FormData(form)
    formData.append("CustomField", "This is some extra data");

    event.preventDefault();
    const response = await fetch("/files",
        {
            body: formData,
            method: "POST",
        });
    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }
    const blob = await response.blob();
    // const myImage = document.querySelector(".my-image") as HTMLImageElement | null;
    // const myImage = document.createElement('img') as HTMLImageElement;
    // root.append(myImage);
    const prefix = "data:image/png;base64";
    const txt =await blob.text();
    const anotherRoot = document.getElementById('v2') as PageViewerV2;
    anotherRoot.imageData = `${prefix}, ${txt}`;
    // if(myImage !==null){
    //     myImage.src = `${prefix}, ${txt}`;
    // }

}

(async () => {
    register();
    const root = document.getElementById('root');
    if(!root){
        console.log('no root element found');
        return;
    }

    helloWorld();
    const form = document.forms.namedItem("upload-form");

    if(form === null){
        console.log("no form found");
        return;
    }

    form.addEventListener("submit", formSubmitHandler);
})();
