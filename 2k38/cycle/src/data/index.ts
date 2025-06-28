//subs
import { deluxeOrPremium } from './subs/CardSubs';
import { extra } from './subs/CardSubs';
import { essential } from './subs/CardSubs';
import { gtaplus } from './subs/GTA+';
import { ubisoftplus } from './subs/Ubisoft+';

//games
import { assassinsCreedShadows } from './games/AssassinsCreedShadows';
import { assassinsCreedValhalla } from './games/AssassinsCreedValhalla';
import { astroBot } from './games/AstroBot';
import { blackMythWukong } from './games/BlackMythWukong';
import { borderlands4 } from './games/Borderlands4';
import { callOfDutyModernWarfareIII } from './games/CallOfDutyModernWarfareIII';
import { clairObscurExpedition33 } from './games/ClairObscur33';
import { codbo6 } from './games/CODBO6';
import { codcoldwar } from './games/CallOfDutyColdWar';
import { crash4ItsAboutTime } from './games/Crash4';
import { crashTrilogy } from './games/CrashTrilogy';
import { cyberpunk } from './games/CyberPunk';
import { deathStranding } from './games/DeathStranding';
import { deathStranding2OnTheBeach } from './games/DeathStranding2';
import { doomTheDarkAges } from './games/DoomTheDarkAges';
import { elderScrollsOblivionRemastered } from './games/ElderScrollsOblivionRem';
import { eldenRing } from './games/ElderRing';
import { eldenRingDLC } from './games/EldenRingDLC';
import { eldenRingNightreign } from './games/EldenRingNightReign';
import { f125 } from './games/F12k25';
import { fc25 } from './games/FC25';
import { finalFantasyVIIRemake } from './games/FFVIIRemake';
import { finalFantasyVIIRebirth } from './games/FFVIIRebirth';
import { finalFantasyXVI } from './games/FFXVI';
import { forzaHorizon5 } from './games/ForzaHorizon5';
import { ghostOfYotei } from './games/GhostofYotei';
import { godOfWarRagnarok } from './games/GodOfWarRagnarok';
import { granTurismo7 } from './games/GT7';
import { grandTheftAutoV } from './games/GTAV';
import { gtavi } from './games/GrandTheftAutoVI';
import { hogwartsLegacy } from './games/HogwartsLegacy';
import { horizonForbiddenWest } from './games/HorizonForbiddenWest';
import { horizonZeroDawn } from './games/HorizonZeroDawn';
import { lostSoulAside } from './games/LostSoulAside';
import { nba2k25 } from './games/nba2k25';
import { nfl25 } from './games/NFL25';
import { nflCollegeFootball2026 } from './games/NFL2k26';
import { redDeadRedemption2 } from './games/RedDead2';
import { redDeadRedemptionI } from './games/RedDeadRedemptionI';
import { residentevil7 } from './games/ResidentEvil7';
import { residentevil9 } from './games/ResidentEvil9';
import { residentevilvillage } from './games/ResidentEvilVillage';
import { riseOfTheTombRaider } from './games/RiseOfTombRaider';
import { shadowOfTheTombRaider } from './games/ShadowOfTombRaider';
import { silentHill2Remake } from './games/SilentHill2Remake';
import { silenthillf } from './games/SilentHillF';
import { spiderman2 } from './games/Spiderman2';
import { spidermanMilesMorales } from './games/SpidermanMiles';
import { spidermanRemastered } from './games/Spiderman';
import { starWarsOutlaws } from './games/StarWarsOutlaws';
import { theLastOfUs } from './games/TheLastOfUsI';
import { theLastOfUsPart2 } from './games/TheLastOfUsPart2';
import { theLastOfUsPartI } from './games/TheLastOfUsPartI';
import { tonyHawk12 } from './games/TonyHawk1+2';
import { tonyHawk3Plus4 } from './games/TonyHawk3+4';
import { tombRaider } from './games/TombRaider';
import { tombRaiderRemasteredIVVVI } from './games/TombRaiderRemasteredIVVVI';
import { untilDawn } from './games/UntilDawn';

//cars
import { vwNivus } from './cars/vwnivus';
import { vwTera } from './cars/vwtera';

//consoles and acessories
import { dualsensetlou } from './consoles/dualSenseTLOU';
import { ns2 } from './consoles/ns2';
import { ps3 } from './consoles/ps3';
import { ps4 } from './consoles/ps4';
import { ps5 } from './consoles/ps5';

//products
import { bigmac } from './products/bigmac';
import { bionatural } from './products/bionatural';
import { cafe } from './products/coffee';
import { icecream } from './products/icecream';
import { psgiftcard } from './products/PSgiftcard';

//coins
import { coin } from './coins/coins';

//subs
export const subs = {
  'Deluxe or Premium': deluxeOrPremium,
  'Extra': extra,
  'Essential': essential,
  'GTA+': gtaplus,
  'Ubisoft+': ubisoftplus,
} as const;

//games
export const games = {
  'Assassins Creed Shadows': assassinsCreedShadows,
  'Assassins Creed Valhalla': assassinsCreedValhalla,
  'Astro Bot': astroBot,
  'Black Myth Wukong': blackMythWukong,
  'Borderlands 4': borderlands4,
  'Call Of Duty Black Ops 6': codbo6,
  'Call Of Duty Cold War': codcoldwar,
  'Call of Duty Modern Warfare III': callOfDutyModernWarfareIII,
  'Clair Obscur Expedition 33': clairObscurExpedition33,
  'Crash 4 About Time': crash4ItsAboutTime,
  'Crash Trilogy': crashTrilogy,
  'Cyber Punk 2077': cyberpunk,
  'Death Stranding': deathStranding,
  'Death Stranding 2': deathStranding2OnTheBeach,
  'Doom The Dark Ages': doomTheDarkAges,
  'Elder Scrolls Oblivion Remastered': elderScrollsOblivionRemastered,
  'Elden Ring': eldenRing,
  'Elden Ring DLC': eldenRingDLC,
  'Elden Ring Nightreign': eldenRingNightreign,
  'F1 25': f125,
  'FC 25': fc25,
  'Final Fantasy VII Rebirth': finalFantasyVIIRebirth,
  'Final Fantasy VII Remake': finalFantasyVIIRemake,
  'Final Fantasy XVI': finalFantasyXVI,
  'Forza Horizon 5': forzaHorizon5,
  'Ghost of Yotei': ghostOfYotei,
  'God Of War Ragnarok': godOfWarRagnarok,
  'Gran Turismo 7': granTurismo7,
  'Grand Theft Auto V': grandTheftAutoV,
  'Grand Theft Auto VI': gtavi,
  'Hogwarts Legacy': hogwartsLegacy,
  'Horizon Forbidden West': horizonForbiddenWest,
  'Horizon Zero Dawn': horizonZeroDawn,
  'Lost Soul Aside': lostSoulAside,
  'NBA 2k25': nba2k25,
  'NFL 25': nfl25,
  'NFL College Football 2k26': nflCollegeFootball2026,
  'Red Dead Redemption 2': redDeadRedemption2,
  'Red Dead Redemption I': redDeadRedemptionI,
  'Resident Evil 7': residentevil7,
  'Resident Evil 9 Requiem': residentevil9,
  'Resident Evil Village': residentevilvillage,
  'Rise Of The Tomb Raider': riseOfTheTombRaider,
  'Shadow Of Tomb Raider': shadowOfTheTombRaider,
  'Silent Hill 2 Remake': silentHill2Remake,
  'Silent Hill F': silenthillf,
  'Spiderman': spidermanRemastered,
  'Spiderman 2': spiderman2,
  'Spiderman Miles Morales': spidermanMilesMorales,
  'Star Wars Outlaws': starWarsOutlaws,
  'The Last Of Us I': theLastOfUs,
  'The Last Of Us Part I': theLastOfUsPartI,
  'The Last Of Us Part II': theLastOfUsPart2,
  'Tony Hawk 1+2': tonyHawk12,
  'Tony Hawk 3+4': tonyHawk3Plus4,
  'Tomb Raider': tombRaider,
  'Tomb Raider Remastered IV-V-VI': tombRaiderRemasteredIVVVI,
  'Until Dawn': untilDawn,

} as const;

//cars
  export const cars = {
'VW Tera': vwTera,
'VW Nivus': vwNivus
} as const;

//consoles
  export const consoles = {
'Dual Sense TLOU': dualsensetlou,
'Nintendo Switch 2': ns2,
'Playstation 3': ps3,
'Playstation 4': ps4,
'Playstation 5': ps5

} as const;

//products
  export const products = {
'Big Mac': bigmac,
'Ice Cream': icecream,
'Bionatural': bionatural,
'Coffee': cafe,
'PS Gift Card': psgiftcard

} as const;

//coins
  export const coins = {
'Coins': coin,

} as const;