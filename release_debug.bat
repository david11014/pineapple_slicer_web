copy "./pineapple_slicer_web.nw" "./nw-sdk/pineapple_slicer.nw"
cd nw-sdk
copy /b "nw.exe"+"pineapple_slicer.nw" "pineapple_slicer.exe"
del "pineapple_slicer.nw"