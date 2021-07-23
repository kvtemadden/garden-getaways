import FileUploadWithPreview from "file-upload-with-preview";

var upload = new FileUploadWithPreview("myUniqueUploadId", {
    showDeleteButtonOnImages: true,
    text: {
        chooseFile: "Custom Placeholder Copy",
        browse: "Custom Button Copy",
        selectedCount: "Custom Files Selected Copy",
    },
    images: {
        baseImage: importedBaseImage,
    },
    presetFiles: [
        "../public/logo-promosis.png",
        "https://images.unsplash.com/photo-1557090495-fc9312e77b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    ],
});