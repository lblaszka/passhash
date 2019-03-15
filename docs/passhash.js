//todo: add special chars to get. password
function getPasshash( sacredPassword, urlDomain, settings )
{
    urlDomain = getDomain( urlDomain );
    let passhash = sha256(sacredPassword + urlDomain );

    if( settings != null )
        if( settings.useSpecialChars == true )
            passhash = getPassHashWithSpecialChars( passhash );
    return passhash;
}

function getDomain( url )
{
    //http://
    if( 
        ( url.substr(0,7) == "http://" )  
        || ( url.substr(0,8) == "https://" )
    )
    {
        domain = url.split("/");
        return domain[0] + "//"+domain[2]+"/";    
    }
    else
        return url;
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