const uploadImage = async (requestAnimationFrame, res) =>{
  try {
    if(!req.file){
      return res.status(400).json({success: false, message: "Please upload a file"})
    }

    const imagePath = `/uploads/${req.file.filename}`;

    res.status(201).json({
      message: "Image uploaded successfully",
      data:{
        filename: req.file.filename,
        path: imagePath,
        size: req.file.size
      }
    })
  } catch (error) {
    console.error(error)
  }
}