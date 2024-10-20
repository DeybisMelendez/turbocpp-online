const Download = document.getElementById("download");
const Path = document.getElementById("filepath");
const FileInput = document.getElementById("file-input");
const Upload = document.getElementById("upload")

Dos(document.getElementById("dos"), {
  // Credits: https://github.com/sounddrill31/TurboCPP-Web/
  url: "./turbocpp-831b2f5.jsdos",
  onEvent: (event, ci) => {
    if (event === "ci-ready") {
      // Copy Code
      Download.onclick = () => {
        let path = Path.value;
        ci.fsReadFile("prebuilts/turbocpp/BIN/" + path).then((content) => {
          let txt = new TextDecoder().decode(content);
          navigator.clipboard.writeText(txt);
          alert("Código copiado al portapapeles!");
        });
      };
      // Upload Code
      Upload.onclick = () => {
        const File = FileInput.files[0];
        if (File) {
          const Reader = new FileReader();
          Reader.onload = function(evt) {
            const textEncoder = new TextEncoder();
            let filecontent = textEncoder.encode(evt.target.result);
            ci.fsWriteFile("prebuilts/turbocpp/BIN/"+File.name, filecontent);
            alert("Archivo guardado en: " + "BIN/" + File.name + "\nCon contenido:\n" + evt.target.result)
          };
          Reader.readAsText(File, "utf-8");
        }
      };
    }
  },
});