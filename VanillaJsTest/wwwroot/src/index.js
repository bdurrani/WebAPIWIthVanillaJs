import {camelCase} from "lodash";


(async () => {

    console.log(camelCase("hello world"));

    const form = document.forms.namedItem("upload-form");

    form.addEventListener(
        "submit",
        async (event) => {
            const output = document.querySelector("output");
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
            const myImage = document.querySelector(".my-image");
            const prefix = "data:image/png;base64";
            const txt =await blob.text();
            myImage.src = `${prefix}, ${txt}`;
        },
        false
    );
})();
