# Ninja SMP — Fun Season 2 Website

## Social links used
- YouTube: https://www.youtube.com/@Ninja2die
- Join: https://www.youtube.com/@Ninja2die/join
- Discord: https://discord.com/invite/3ZPrUQNKSC
- Planet Minecraft: https://www.planetminecraft.com/project/ninja-smp-season-1-1-21-11/

## Server
- Java: NinjaSMP.gr (25565 default)
- Bedrock / Geyser: NinjaSMP.gr:19132
- Minecraft: 26.3

## Performance changes vs previous draft
- Screenshots converted to WebP
- Max screenshot resolution 1600×900
- No backdrop-filter blur
- No animated marquee
- No live third-party server-status request
- Gallery images use loading="lazy"
- Minimal JavaScript

## DNS plan when the website is deployed
To have BOTH:
- https://NinjaSMP.gr -> website
- NinjaSMP.gr inside Minecraft Java -> Minecraft server

Use:
1. Root NinjaSMP.gr -> website host
2. play.ninjasmp.gr A -> 185.137.94.120
3. SRV:
   _minecraft._tcp.ninjasmp.gr
   Priority 0
   Weight 5
   Port 25565
   Target play.ninjasmp.gr

Bedrock:
- Address: NinjaSMP.gr
- Port: 19132

Note: depending on how the website host handles DNS, Bedrock may be cleaner on play.ninjasmp.gr:19132.

## Διαδικασία εισόδου που εμφανίζεται στο site
1. YouTube Membership
2. Είσοδος στο Discord
3. Άνοιγμα ticket για Ninja SMP
4. Αποστολή Minecraft username + Java/Bedrock
5. Έλεγχος membership και whitelist από Staff
6. Σύνδεση:
   - Java: NinjaSMP.gr
   - Bedrock: NinjaSMP.gr:19132

## Membership tiers shown on site
- Basic membership: access process for Ninja SMP
- Legendary Ninja: 8,99€ / month + server rank

## Bedrock display
IP: NinjaSMP.gr
Port: 19132
