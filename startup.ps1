Write-Host $PSScriptRoot
Invoke-Expression "code ."
Start-Job -ScriptBlock {
    Invoke-Expression "mongod"
}

Set-Location -Path .\client\
Invoke-Expression "npm start"


Write-Output "Startup Complete!"
