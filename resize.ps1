Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('assets\images\logo-luminarytechnicals.png')
function Resize-Image($image, $width, $height, $path) {
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.DrawImage($image, 0, 0, $width, $height)
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $graph.Dispose()
    $bmp.Dispose()
}
Resize-Image $img 96 96 'icons\icon-96.png'
Resize-Image $img 192 192 'icons\icon-192.png'
Resize-Image $img 512 512 'icons\icon-512.png'
$img.Dispose()
