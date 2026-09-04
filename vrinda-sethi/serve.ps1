# Tiny static file server for the demo storefront.
#   Usage:  powershell -ExecutionPolicy Bypass -File serve.ps1
#   Then open http://localhost:8080/
param([int]$Port = 8080)

$root = $PSScriptRoot
$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"
  ".js"="application/javascript; charset=utf-8"; ".json"="application/json"
  ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".png"="image/png"; ".svg"="image/svg+xml"
  ".mp4"="video/mp4"; ".woff2"="font/woff2"; ".woff"="font/woff"; ".ttf"="font/ttf"
  ".ico"="image/x-icon"; ".txt"="text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try { $listener.Start() } catch {
  Write-Host "Could not bind port $Port. Try: serve.ps1 -Port 8081" -ForegroundColor Red; exit 1
}
Write-Host ""
Write-Host "  VRINDA SETHI  ->  http://localhost:$Port/" -ForegroundColor Green
Write-Host "  serving $root"
Write-Host "  Ctrl+C to stop"
Write-Host ""

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "index.html" }
    $path = Join-Path $root $rel

    if (Test-Path -LiteralPath $path -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
      # Dev server: never cache. Without this the browser holds on to old videos
      # and CSS across edits, and a normal reload won't refetch them.
      $ctx.Response.Headers.Add("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
      $ctx.Response.Headers.Add("Pragma", "no-cache")
      $ctx.Response.Headers.Add("Expires", "0")
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $b = [System.Text.Encoding]::UTF8.GetBytes("404 - $rel")
      $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    }
    $ctx.Response.OutputStream.Close()
  } catch { }
}
