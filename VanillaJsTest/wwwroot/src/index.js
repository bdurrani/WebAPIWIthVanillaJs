import { camelCase} from "lodash";

console.log(camelCase("hello world"));

const form = document.forms.namedItem("upload-form");

form.addEventListener(
    "submit",
    async (event) => {
        const output = document.querySelector("output");
        const formData = new FormData(form);

        formData.append("CustomField", "This is some extra data");

        event.preventDefault();
        const response = await fetch("weatherforecast",
            {
                body: formData,
                method: "post"
            });
        return;
    },
    false
);
