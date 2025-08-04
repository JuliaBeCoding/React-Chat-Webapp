Uppgift: React chat webapp med inloggning 

Deadline: 22/8 kl 23:59 

Typ: Individuell inlämningsuppgift 
Betyg: IG/G/VG 
Inlämning: Versionshantera projektet och skicka GitHub repository länken till mig via 
LearnPoint – glöm inte bifoga ett dokument så den blir igenkänd som inlämning. 
Presentation: Utförs helst IRL men går också via Discord. Kom förberedda, demo + 
koddiskussion. TeamViewer kan vi också använda så jag kan ta kontroll.  
Testa Chatify API 
Testa anrop mot Chatify APIet så ni förstår hur det fungerar. Ni testar APIets olika anrop 
med programmet Insomnia/Postman för att bilda er en uppfattning.  
Det finns en Swagger (dokumentation): https://chatify-api.up.railway.app/  
Skapa anrop som: 
• Hämta CSRF token via fetch/axios, PATCH: https://chatify-api.up.railway.app/csrf  
o Se snippet här: https://pastebin.com/raw/9fwJtvS5  
•    Registrera användare, POST: https://chatify-api.up.railway.app/auth/register  
•    Generera token, POST: https://chatify-api.up.railway.app/auth/token 
•    Hämta alla meddelanden GET: https://chatify-api.up.railway.app/messages  
•    Skapa meddelande POST: https://chatify-api.up.railway.app/messages  
•    Radera meddelande DELETE: https://chatify-api.up.railway.app/messages/{msgId} 
•    Hämta ALLA användare GET: https://chatify-api.up.railway.app/users 
o query params stöds, ex: https://chatify-api.up.railway.app/users?limit=2&offset=2  
•    Hämta specifik användare GET: https://chatify-api.up.railway.app/users/{userId}   
•    Uppdatera användare PUT: https://chatify-api.up.railway.app/user    
•    Radera användare DELETE: https://chatify-api.up.railway.app/users/{userId}    
Komplett lista av anrop finns på Swagger. 
= Kräver JWT 
= Kräver CSRF 
OBS: Migrerar jag APIet (ny URL, troligtvis till Azure) pga ekonomiska skäl så 
meddelar jag er på Discord/LearnPoint. 
Beskrivning: Chat appen 
Efter att ha säkerställt att APIet fungerar som det ska, då är det dags att skapa React appen 
som jobbar mot APIet. Följande är obligatoriska delar för betyget G. 
LÄS INSTRUKTIONERNA NOGA! 
1 
● Skapa appen via npm create vite@latest 
● Appen skall vara lösenordsskyddad vid inloggningsförfarande. 
● Visa endast "Registrera" & "Login" sidorna när man är utloggad 
● Felmeddelanden får översättas, så länge budskapet framgår 
● Register.jsx: 
○ Man behöver registrera sig först. 
○ Username måste vara unikt. Om man anger ett username som redan finns, då skall 
man visa felmeddelandet som fås av APIet ”Username or email already exists”. 
○ Har man lyckats registrera användare så ska användaren få feedback om detta 
på något sätt samt automatiskt redirectas till Login.jsx 
● Login.jsx: 
○ Om fel inloggningsuppgifter anges, visa felmeddelandet som fås av APIet 
”Invalid credentials”. Ni får tydliggöra det på klienten om ni vill. 
○ Vid lyckad inlogg, skall man spara token tillsammans med annan info, 
såsom id, user & avatar i state och/eller session-/localStorage. 
• Ni behöver decoda token, se decode-jwt eller snippet 
○ Man ska kunna ladda om sidan och fortfarande vara inloggad. 
○ Visa användarnamn och avatar någonstans på sidan när man är 
inloggad. Notis: Avatar är i databasen en varchar(255) som kan 
representera en sträng, en URL till en bild exempelvis 
https://i.pravatar.cc/200 
○ Fixa en CSP policy på klienten som tillåter en eller flera domäner ni vitlistar för 
bilder – utifrån den avatar URL ni valt förslagsvis (testa så allt fungerar): 
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 
'self' https://i.pravatar.cc https://freeimage.host;"> 
○ Redirecta till Chat.jsx vid lyckad inloggning 
● Chat.jsx: 
○ Visa alla meddelanden. 
○ Alla meddelanden som tillhör den inloggade personen, skall visas på höger sida 
○ Alla andra meddelanden skall visas på vänster sida 
• OBS: Du behöver alltså inte kunna chatta med en annan riktig 
användare, den ”andra” kan du fejka – se här 
○ Man skall kunna skapa nya meddelanden 
Ni ska sanitera innehållet på något sätt 
○ Man skall kunna radera befintliga meddelanden 
● SideNav.jsx: 
○ Visas genom en sidenav, se detta så förstår ni https://t.ly/PFbQq  
Tips: https://t.ly/iaWJa 
○ Visa endast en logout knapp som loggar ut, rensar token & redirectas till Login
sidan. 
2 
● Generellt: 
○ Ni behöver lägga upp den på Netlify. Ändra site namn till 
något ni gillar. Anledning till detta är för att öva på hosting 
samt att inte få CORS problem då jag konfigurerat servern 
att whitelista Netlify.          
Design 
Applicera ett lämpligt ramverk och/eller egenskriven CSS för att få en snygg design på din 
applikation. 
Betyg 
Ni betygssätts individuellt. 
G 
Kriterierna ovan är korrekt utförda och applikationen fungerar bra utifrån den interaktion 
som beskrivs. 
VG 
Förutom att G kraven uppnåtts, måste studenten även uppnå följande krav: 
● Någon form av loggning, se riktlinjer: https://t.ly/3nFy2  
● Fixa monitorering av loggar - 
Loggarna ska upp på något verktyg som Sentry, New Relic eller Rollbar. Hittar ni något annat 
gratisverktyg så meddela mig. Ta screenshots eller fixa en nyckel (om de har ett API) till mig 
så jag kan konsumera era loggar. 
Vad för relevanta loggar väljer NI. 
● Chat.jsx: 
○ Kunna hantera flera konversationer, minst 2 olika. Använd er av conversationId som ska 
bestå av en GUID. Räcker med crypto.randomUUID() i de moderna webbläsarna. 
Annars funkar denna snippet. 
Exempelanrop:  
https://chatify-api.up.railway.app/messages?conversationId=5a430141
8064-4388-ab65-9161a245a3f4  
Swagger: 
https://chatify-api.up.railway.app/api-docs/#/Messages/get_messages  
● Profile.jsx: 
○ Ska vara det första meny alternativet på en SideNav tillsammans med 
logout knapp 
○ Man skall kunna uppdatera username, email samt avatar 
• Byter man avatar ska en preview visas efter att man lagt in ny URL, se demo 
○ Man skall kunna radera sin användare och med detta så ska man få tydlig 
feedback/varning om vad man försöker göra. I samband med lyckad radering skall man 
loggas ut och redirectas till Login.jsx. 
Återkom till mig om ni har frågor/funderingar. Glöm inte deadline och 
att läsa instruktioner noga så ni inte missar något. Lycka till!        
3 # React-Chat-Webapp
