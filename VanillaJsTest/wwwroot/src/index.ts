import * as _ from 'lodash';
import {helloWorld} from './test';

(async () => {

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
            const output = document.querySelector("output")
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
            const myImage = document.querySelector(".my-image") as HTMLImageElement | null;
            const prefix = "data:image/png;base64";
            const txt =await blob.text();
            if(myImage !==null){
                myImage.src = `${prefix}, ${txt}`;
            }
        },
        false
    );
})();
