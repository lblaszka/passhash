//todo: add special chars to get. password
function getPasshash( sacredPassword, urlDomain, settings )
{
    console.log(settings);

    let passhash = sha256( sacredPassword +  pageDomain );

    if( settings != null )
        if( settings.useSpecialChars == true )
            passhash = getPassHashWithSpecialChars( passhash );
    return passhash;
}

function getPassHashWithSpecialChars(passhash) 
{
    let passhash_sec = sha256(passhash);
    let newPasshash = "";
    for (var charIndex = 0; charIndex < passhash.length; charIndex++)
    {
        let newCharValue = ( (48 - passhash_sec.charCodeAt(charIndex)) * (48 - passhash_sec.charCodeAt(charIndex))) % 94 + 32;

        newPasshash += String.fromCharCode(newCharValue);
    }
    return newPasshash;
}