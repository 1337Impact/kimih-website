const convertImageToWebP = async (imageFile: File) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 800; // Example maximum width
      const maxHeight = 600; // Example maximum height
      const scaleFactor = Math.min(
        maxWidth / img.width,
        maxHeight / img.height,
      );
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Draw the image on the resized canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webPFile = new File([blob], `${imageFile.name}`, {
                type: "image/webp",
              });
              resolve(webPFile);
            } else {
              reject(new Error("Failed to convert image to WebP format."));
            }
          },
          "image/webp",
          1,
        );
      } else {
        reject(new Error("Failed to create canvas context."));
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image."));
    };
  });
};

export default convertImageToWebP;
