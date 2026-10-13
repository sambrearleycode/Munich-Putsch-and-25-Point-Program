export interface IdeologyPoint {
  id: number;
  title: string;
  summary: string;
  fullText: string;
  category: 'Nationalist' | 'Socialist' | 'Anti-Semitic' | 'Authoritarian';
  explanation: string;
  realWorldLink: string;
  relatedEvents: string[];
  relatedActors: string[];
}

export interface CrisisEvent {
  id: string;
  date: string;
  title: string;
  category: 'Economic' | 'Political' | 'Ideological' | 'Military & Judiciary';
  track: 'macro' | 'nsdap';
  stabilityScore: number; // 1-10 (1 = total collapse/chaos, 10 = robust democracy)
  economicImpact: string;
  politicalImpact: string;
  naziExploitation: string;
  keyActors: string[];
  isSparkTrigger?: boolean;
}

export interface PutschBeat {
  id: number;
  time: string;
  phase: string;
  location: string;
  keyActors: string[];
  outcome: string;
  failureFactor: string;
  narrative: string;
}

export interface JudicialBiasComparison {
  id: string;
  aspect: string;
  legalStandard: string;
  hitlerTreatment: string;
  leftWingContrast: string;
  historicalSignificance: string;
}

export type DebateInterpretation =
  | 'Weimar Strength / Structural Resilience'
  | 'Moderate / Pro-Republic'
  | 'Weimar Weakness / Fortuitous Survival'
  | 'Critical / Anti-Republic Legacy';

export interface HistoriographicalDebate {
  id: number;
  topic: string;
  statementA: {
    text: string;
    interpretation: DebateInterpretation;
    evidence: string;
  };
  statementB: {
    text: string;
    interpretation: DebateInterpretation;
    evidence: string;
  };
}

export interface EvidenceCard {
  id: string;
  title: string;
  category: 'Political' | 'Economic' | 'Military' | 'Social' | 'Judicial';
  dateRange: string;
  summary: string;
  analyticalDetail: string;
  defaultBias: 'strength' | 'weakness';
}

export interface InquiryPrompt {
  id: string;
  trigger: string;
  title: string;
  question: string;
  context: string;
  aqaGuidance: {
    ao1: string; // Knowledge and understanding
    ao2: string; // Analysis and evaluation
    modelPoints: string[];
  };
}

export const IDEOLOGY_POINTS: IdeologyPoint[] = [
  {
    id: 1,
    title: "Greater Germany (Großdeutschland)",
    summary: "Union of all Germans in a Greater Germany on the basis of self-determination.",
    fullText: "We demand the union of all Germans to form a Great Germany on the basis of the right of self-determination of peoples.",
    category: "Nationalist",
    explanation: "Sought to overturn the borders established after WWI and incorporate German-speaking populations in Austria, the Sudetenland, and former Reich territories.",
    realWorldLink: "Austrian-born Hitler used this to appeal to border grievances and to unite Austrian and Bavarian nationalist sympathizers against Berlin's perceived surrender.",
    relatedEvents: ["versailles", "munich-putsch"],
    relatedActors: ["Hitler", "Ludendorff"]
  },
  {
    id: 2,
    title: "Abolition of Peace Treaties",
    summary: "Revocation of the Treaties of Versailles and St. Germain.",
    fullText: "We demand equality of right for the German People in its dealings with other nations, and abolition of the Peace Treaties of Versailles and St Germain.",
    category: "Nationalist",
    explanation: "Direct assault on the international legal settlement of 1919, branding Weimar politicians as the 'November Criminals' who accepted national humiliation.",
    realWorldLink: "Hitler's primary rhetorical weapon in 1923; framed the Ruhr occupation as the inevitable, degrading consequence of Versailles compliance (Erfüllungspolitik).",
    relatedEvents: ["versailles", "ruhr-invasion", "munich-putsch"],
    relatedActors: ["Hitler", "Ebert", "Stresemann"]
  },
  {
    id: 3,
    title: "Land and Colonies (Lebensraum)",
    summary: "Territory and colonies for the nourishment and settlement of surplus population.",
    fullText: "We demand land and territory (colonies) for the nourishment of our people and for settling our surplus population.",
    category: "Nationalist",
    explanation: "Early conceptualization of German territorial expansion and imperial restoration to achieve self-sufficiency.",
    realWorldLink: "Leveraged during the 1923 food shortages and coal cutoffs to argue Germany was being deliberately starved by the Entente powers.",
    relatedEvents: ["ruhr-invasion", "hyperinflation"],
    relatedActors: ["Hitler"]
  },
  {
    id: 4,
    title: "Racial Citizenship & Exclusion of Jews",
    summary: "Only persons of German blood may be citizens; no Jew may be a citizen.",
    fullText: "Only members of the nation may be citizens of the State. None but those of German blood, whatever their creed, may be members of the nation. No Jew, therefore, may be a member of the nation.",
    category: "Anti-Semitic",
    explanation: "Core biological racism asserting that German citizenship is hereditary and inherently exclusive of Jewish people.",
    realWorldLink: "Hitler scapegoated Jewish financiers and politicians for hyperinflation and the 'stab in the back' (Dolchstoßlegende) in every beer hall address.",
    relatedEvents: ["rathenau-assassination", "hyperinflation", "munich-putsch"],
    relatedActors: ["Hitler", "Streicher"]
  },
  {
    id: 5,
    title: "Non-Citizens as Guests",
    summary: "Non-citizens may only live in Germany as guests subject to foreign laws.",
    fullText: "Whoever is not a citizen of the State may live in Germany only as a guest, and must be considered as subject to laws for foreigners.",
    category: "Anti-Semitic",
    explanation: "Stripped legal protections from non-Aryan inhabitants, making deportation a permanent threat.",
    realWorldLink: "Fueled Bavarian xenophobia against eastern European Jewish refugees arriving in Munich after WWI.",
    relatedEvents: ["rathenau-assassination"],
    relatedActors: ["Hitler", "von Kahr"]
  },
  {
    id: 6,
    title: "Public Office Restricted to Citizens",
    summary: "Only citizens may vote and hold public office; rejection of corrupt parliamentarism.",
    fullText: "The right of voting is to be enjoyed by the citizens of the State alone. We demand that all official appointments shall be granted to citizens alone. We oppose corrupt Parliamentary customs of filling posts on party lines.",
    category: "Authoritarian",
    explanation: "Attack on representative democracy, civil service recruitment under Weimar coalition parties, and non-Aryan public officials.",
    realWorldLink: "Bavarian conservative civil servants and judiciary openly shared this hatred for the SPD/Zentrum coalition bureaucracy in Berlin.",
    relatedEvents: ["weimar-constitution", "kapp-putsch"],
    relatedActors: ["Hitler", "von Kahr"]
  },
  {
    id: 7,
    title: "State Obligation to Livelihood",
    summary: "The State must guarantee the employment and livelihood of citizens first.",
    fullText: "We demand that the State undertake an obligation to produce livelihoods for citizens. If not possible to feed the entire population, foreigners must be expelled.",
    category: "Socialist",
    explanation: "A blend of welfarism and xenophobic expulsion aimed at capturing working-class and lower-middle-class support.",
    realWorldLink: "Directly exploited the mass unemployment and social misery caused by passive resistance during the 1923 Ruhr crisis.",
    relatedEvents: ["ruhr-invasion", "hyperinflation"],
    relatedActors: ["Hitler"]
  },
  {
    id: 8,
    title: "Halt to Non-German Immigration",
    summary: "Complete ban on non-German immigration and expulsion of those arrived since 1914.",
    fullText: "All further non-German immigration must be prevented. We demand that all non-Germans who entered Germany after August 2, 1914, be forced to leave immediately.",
    category: "Anti-Semitic",
    explanation: "Targeted 'Ostjuden' (Eastern European Jews) who fled the Russian Empire and Poland during the war.",
    realWorldLink: "In Autumn 1923, Bavarian General State Commissioner Gustav von Kahr actually ordered expulsions of Eastern European Jews, competing with Hitler's rhetoric.",
    relatedEvents: ["bavaria-emergency"],
    relatedActors: ["von Kahr", "Hitler"]
  },
  {
    id: 9,
    title: "Equal Rights and Equal Duties",
    summary: "All citizens must possess equal rights and equal civil duties.",
    fullText: "All citizens of the State shall possess equal rights and duties.",
    category: "Authoritarian",
    explanation: "Presented as egalitarianism, but conditioned upon strict racial purity and submission to state obligations.",
    realWorldLink: "Used by party speakers to decry Allied inspections and international reparations commissions as unequal subjugation.",
    relatedEvents: ["versailles"],
    relatedActors: ["Hitler"]
  },
  {
    id: 10,
    title: "Obligation to Work & Common Good",
    summary: "First duty of every citizen is mental or physical work; no clash with the community.",
    fullText: "It must be the first duty of every citizen to perform mental or physical work. The activities of the individual must proceed within the framework of the community and be for the general good.",
    category: "Socialist",
    explanation: "Ideological elevation of work and subordination of personal liberty to the 'Volksgemeinschaft' (People's Community).",
    realWorldLink: "Attacked passive resistance in the Ruhr as a 'parasitic stalemate' that Weimar financed with worthless printed paper.",
    relatedEvents: ["ruhr-invasion"],
    relatedActors: ["Hitler"]
  },
  {
    id: 11,
    title: "Abolition of Unearned Income",
    summary: "Abolition of incomes unearned by work and abolition of the thraldom of interest.",
    fullText: "Abolition of incomes unearned by work. Abolition of the thraldom (slavery) of interest (Brechung der Zinsknechtschaft).",
    category: "Socialist",
    explanation: "Gottfried Feder's economic theory separating 'productive German national capital' from 'parasitic international finance capital' (coded anti-Semitism).",
    realWorldLink: "Resonated intensely with ruined middle-class savers and shopkeepers watching currency speculators and foreign currency holders profit during 1923.",
    relatedEvents: ["hyperinflation"],
    relatedActors: ["Hitler"]
  },
  {
    id: 12,
    title: "Confiscation of War Profits",
    summary: "Ruthless confiscation of all wartime wealth accumulated through profiteering.",
    fullText: "In view of the enormous sacrifice of life and property demanded of a nation by any war, personal enrichment from war must be treated as a crime. We demand ruthless confiscation of all war profits.",
    category: "Socialist",
    explanation: "Popular populist demand appealing to trench veterans returning home to poverty while industrial cartels remained wealthy.",
    realWorldLink: "Leveraged veterans' fury (including front-line Freikorps members) against industrial magnates and Weimar politicians.",
    relatedEvents: ["kapp-putsch"],
    relatedActors: ["Hitler", "Röhm"]
  },
  {
    id: 13,
    title: "Nationalisation of Trusts and Cartels",
    summary: "State ownership of all large corporate trusts and industrial monopolies.",
    fullText: "We demand the nationalisation of all businesses which have been hitherto formed into trusts (companies).",
    category: "Socialist",
    explanation: "Anti-monopoly rhetoric meant to win leftist workers away from the KPD and SPD, though later quietly sidelined by Hitler.",
    realWorldLink: "Munich SA recruits from working-class backgrounds believed the party stood for radical anti-capitalist redistribution.",
    relatedEvents: ["spartacist-rising"],
    relatedActors: ["Hitler"]
  },
  {
    id: 14,
    title: "Profit-Sharing in Heavy Industry",
    summary: "Workers to share directly in the profits of heavy industrial firms.",
    fullText: "We demand that there shall be profit-sharing in the great industries.",
    category: "Socialist",
    explanation: "Drexler's original worker-oriented pledge to establish class harmony rather than Marxist class warfare.",
    realWorldLink: "Offered as an alternative to trade union strikes during the crippling inflationary cycles of 1922-1923.",
    relatedEvents: ["hyperinflation"],
    relatedActors: ["Hitler"]
  },
  {
    id: 15,
    title: "Expansion of Old-Age Pensions",
    summary: "Large-scale expansion of old-age welfare and state security.",
    fullText: "We demand a general development of provision for old age.",
    category: "Socialist",
    explanation: "Targeted the vulnerable elderly and retired state officials whose fixed Weimar pensions were rendered entirely worthless by inflation.",
    realWorldLink: "By mid-1923, fixed-income pensioners were literally starving as Weimar paper pensions could not buy a single egg.",
    relatedEvents: ["hyperinflation"],
    relatedActors: ["Hitler"]
  },
  {
    id: 16,
    title: "Support for the Mittelstand",
    summary: "Creation of a healthy middle class; communalisation of large department stores leased to small shopkeepers.",
    fullText: "We demand the creation and maintenance of a healthy middle class, immediate communalisation of wholesale warehouses, and their lease at low rates to small traders.",
    category: "Socialist",
    explanation: "Appealed directly to artisans, shopkeepers, and clerks threatened by modern retail stores (often stereotyped as Jewish-owned).",
    realWorldLink: "The Mittelstand formed the initial core of Nazi membership in Bavaria, terrified of proletarianization by inflation.",
    relatedEvents: ["hyperinflation"],
    relatedActors: ["Hitler"]
  },
  {
    id: 17,
    title: "Land Reform and Anti-Speculation",
    summary: "Land reform for national needs, prohibition of land speculation, abolition of ground rent.",
    fullText: "We demand a land reform suitable to our national requirements... the abolition of interest on mortgages, and prohibition of all speculation in land.",
    category: "Socialist",
    explanation: "Appealed to small farmers and peasants burdened by mortgages and terrified of bank foreclosures.",
    realWorldLink: "Garnered crucial rural Bavarian agricultural support outside Munich in Upper Bavaria and Franconia.",
    relatedEvents: ["hyperinflation"],
    relatedActors: ["Hitler"]
  },
  {
    id: 18,
    title: "Death Penalty for Profiteers",
    summary: "All-out war on profiteers, usurers, and criminals against the nation, punishable by death.",
    fullText: "We demand an all-out battle against those who damage the common interest; criminals against the nation, profiteers, racketeers, etc. should be punished by death, without regard to religion or race.",
    category: "Authoritarian",
    explanation: "Draconian punitive justice appealing to public rage over economic collapse and black marketeering.",
    realWorldLink: "During the 1923 hyperinflation peak, Hitler’s SA threatened Munich merchants and shopkeepers accused of 'usury' and price gouging.",
    relatedEvents: ["hyperinflation", "munich-putsch"],
    relatedActors: ["Hitler", "Röhm"]
  },
  {
    id: 19,
    title: "Germanic Common Law",
    summary: "Replacement of materialistic Roman law with Germanic common law.",
    fullText: "We demand the replacement of the system of Roman Law, which serves the materialistic world order, by a system of Germanic Common Law.",
    category: "Authoritarian",
    explanation: "Rejection of codified liberal individual rights in favor of völkisch collective authority and customary tribal allegiance.",
    realWorldLink: "Directly mirrored the Bavarian judicial bias in 1924, where judges prioritized 'German patriotic sentiment' over constitutional treason statutes.",
    relatedEvents: ["munich-trial"],
    relatedActors: ["Hitler"]
  },
  {
    id: 20,
    title: "State Education Reform",
    summary: "Thorough overhaul of national schooling to adapt to practical life and citizenship; support for gifted poor children.",
    fullText: "The state must carry the burden of a thorough overhaul of the national education system. The curricula must adapt to practical life. We must instil national ideas from the earliest age in lessons in citizenship.",
    category: "Authoritarian",
    explanation: "Transformation of schools into instruments of patriotic indoctrination and national character training.",
    realWorldLink: "University students in Munich formed enthusiastic early recruits for the Nazi party and SA marching formations in 1923.",
    relatedEvents: ["munich-putsch"],
    relatedActors: ["Hitler"]
  },
  {
    id: 21,
    title: "Public Health & Physical Fitness",
    summary: "State protection of mothers and children, ban on child labor, compulsory gymnastics.",
    fullText: "The state must ensure the general good health of its citizens, by providing for mothers and children, by banning child labour, and by legal obligation to participate in sport and gymnastics.",
    category: "Socialist",
    explanation: "Militarized welfare designed to build healthy bodies for future national defense and racial regeneration.",
    realWorldLink: "SA units were initially disguised as 'gymnastic and sports departments' (Turn- und Sportabteilung) to evade Allied disarmament scrutiny.",
    relatedEvents: ["sa-founded"],
    relatedActors: ["Hitler", "Röhm"]
  },
  {
    id: 22,
    title: "Abolition of the Professional Army",
    summary: "Replacement of the mercenary army with a broad People's Army (Volksheer).",
    fullText: "We demand the abolition of the professional army and its replacement by a people's army.",
    category: "Nationalist",
    explanation: "Attack on the 100,000-man Reichswehr ceiling imposed by Versailles, advocating universal conscription.",
    realWorldLink: "Allied with Freikorps paramilitaries (Kampfbund) and General Ludendorff to create a shadow military force ready to march on Berlin.",
    relatedEvents: ["versailles", "munich-putsch"],
    relatedActors: ["Hitler", "Ludendorff", "Röhm"]
  },
  {
    id: 23,
    title: "Censorship of Media and Art",
    summary: "Ban on anti-national newspapers; legal suppression of decadent literature and art.",
    fullText: "Newspapers which are deemed to be against the common good should be banned. We demand a legal battle against any art and literature which exerts a harmful influence on public life.",
    category: "Authoritarian",
    explanation: "Total suppression of free press and cultural avant-garde (Weimar modernism, Bauhaus, expressionism) as 'cultural decay'.",
    realWorldLink: "The Nazi organ Völkischer Beobachter was repeatedly banned by Berlin for sedition, but protected by the Bavarian government in Munich.",
    relatedEvents: ["bavaria-emergency"],
    relatedActors: ["Hitler", "Streicher"]
  },
  {
    id: 24,
    title: "Positive Christianity & Anti-Materialism",
    summary: "Religious freedom provided it does not harm the state; struggle against Jewish spirit.",
    fullText: "The Party represents a positively Christian position without binding itself to one faith. The Party opposes the materialistic Jewish spirit within and beyond us. Common Good before Personal Gain.",
    category: "Anti-Semitic",
    explanation: "Subordinated traditional Christian ethics to racial loyalty and used Christian terminology to legitimize anti-Semitism in Catholic Bavaria.",
    realWorldLink: "Crucial for winning tolerance in deeply Catholic Bavaria, where the Catholic Church viewed atheistic Communism with horror.",
    relatedEvents: ["bavaria-emergency"],
    relatedActors: ["Hitler"]
  },
  {
    id: 25,
    title: "Strong Central Reich Power",
    summary: "Creation of a powerful central government with unconditional authority over all states.",
    fullText: "In order to achieve all the foregoing requirements we demand the creation of a strong central power of the Reich, unconditional authority of the politically central Parliament over the entire Reich and its organisation.",
    category: "Authoritarian",
    explanation: "Demand for total centralist dictatorship and abolition of federal state rights, centralizing all power in Berlin.",
    realWorldLink: "Created a profound paradox in 1923: Hitler had to ally with Bavarian particularists and monarchist separatists (von Kahr) while secretly planning a centralized unitary Reich.",
    relatedEvents: ["bavaria-emergency", "munich-putsch"],
    relatedActors: ["Hitler", "von Kahr", "Ludendorff"]
  }
];

export const CRISIS_CHRONICLE: CrisisEvent[] = [
  {
    id: "ebert-groener",
    date: "10 Nov 1918",
    title: "Ebert-Groener Pact",
    category: "Political",
    track: "macro",
    stabilityScore: 5,
    economicImpact: "Maintained baseline food distribution networks and industrial supply lines following the sudden naval mutiny.",
    politicalImpact: "Chancellor Friedrich Ebert allied the nascent democratic government with General Wilhelm Groener's imperial army officer corps in exchange for defense against Bolshevik revolution.",
    naziExploitation: "Later attacked by Hitler as proof that Weimar was born out of an unholy compromise between 'socialist traitors' and generals who surrendered the front.",
    keyActors: ["Ebert"]
  },
  {
    id: "spartacist-rising",
    date: "5–12 Jan 1919",
    title: "Spartacist Uprising in Berlin",
    category: "Political",
    track: "macro",
    stabilityScore: 3,
    economicImpact: "General strike paralyzed Berlin; transport and government offices brought to an abrupt standstill.",
    politicalImpact: "Rosa Luxemburg and Karl Liebknecht led KPD rebellion; brutally crushed by right-wing Freikorps on Ebert's defense minister Noske's orders. Permanent split between SPD and KPD.",
    naziExploitation: "Fueled intense right-wing anti-Bolshevik panic in Munich, especially after the subsequent brief Bavarian Soviet Republic (Räterepublik) of April 1919.",
    keyActors: ["Ebert"]
  },
  {
    id: "versailles",
    date: "28 Jun 1919",
    title: "Signing of the Treaty of Versailles",
    category: "Political",
    track: "macro",
    stabilityScore: 4,
    economicImpact: "Loss of 13% of territory, 75% of iron ore, 26% of coal, plus devastating reparations burden later fixed at 132 billion gold marks.",
    politicalImpact: "Universal outrage across Germany; Article 231 (War Guilt Clause) and the 'Diktat' poisoned democratic legitimacy from the very start. Birth of the 'Dolchstoßlegende'.",
    naziExploitation: "Cornerstone of Point 2 of the 25 Points. Hitler endlessly branded Weimar leaders as the 'November Criminals' who signed Germany's enslavement.",
    keyActors: ["Ebert", "Hitler"]
  },
  {
    id: "weimar-constitution",
    date: "11 Aug 1919",
    title: "Weimar Constitution Promulgated",
    category: "Political",
    track: "macro",
    stabilityScore: 6,
    economicImpact: "Guaranteed progressive social welfare, 8-hour workday, and collective bargaining rights for trade unions.",
    politicalImpact: "Created one of Europe's most democratic systems (universal suffrage, bill of rights), but embedded fatal structural flaws: Article 48 emergency decrees and extreme Proportional Representation.",
    naziExploitation: "Hitler argued parliamentary coalition chaos and weak multi-party cabinets proved the necessity of an authoritarian leader (Führerprinzip).",
    keyActors: ["Ebert"]
  },
  {
    id: "nsdap-program",
    date: "24 Feb 1920",
    title: "NSDAP 25-Point Programme Launched",
    category: "Ideological",
    track: "nsdap",
    stabilityScore: 6,
    economicImpact: "Populist synthesis attacking department stores, land speculation, and interest slavery while demanding nationalization of trusts.",
    politicalImpact: "Anton Drexler's German Workers' Party (DAP) transformed into the National Socialist German Workers' Party (NSDAP) at Munich's Hofbräuhaus.",
    naziExploitation: "Gave Hitler a coherent platform to appeal simultaneously to radical nationalists, bitter war veterans, and economically insecure lower-middle-class shopkeepers.",
    keyActors: ["Hitler"]
  },
  {
    id: "kapp-putsch",
    date: "13–17 Mar 1920",
    title: "Kapp Putsch & General Strike",
    category: "Military & Judiciary",
    track: "macro",
    stabilityScore: 3,
    economicImpact: "Massive nationwide general strike by SPD trade unions completely shut down power, water, trains, and industry.",
    politicalImpact: "Freikorps Ehrhardt Brigade marched into Berlin; General von Seeckt famously refused to intervene ('Reichswehr does not fire on Reichswehr'). Putsch collapsed only because workers struck.",
    naziExploitation: "Demonstrated the military's reluctance to protect the Republic against right-wing nationalists, emboldening Munich conspirators.",
    keyActors: ["Ebert", "Seeckt", "Ludendorff"]
  },
  {
    id: "sa-founded",
    date: "4 Nov 1921",
    title: "Establishment of the SA (Sturmabteilung)",
    category: "Military & Judiciary",
    track: "nsdap",
    stabilityScore: 5,
    economicImpact: "Financed by wealthy Munich patrons and party dues; provided employment and camaraderie to destitute ex-soldiers.",
    politicalImpact: "Created a dedicated paramilitary wing of 'Brownshirts' headed by Ernst Röhm to protect Nazi meetings and terrorize political opponents.",
    naziExploitation: "Enabled the NSDAP to violently dominate Munich street politics and prepare for armed insurrection.",
    keyActors: ["Hitler", "Röhm"]
  },
  {
    id: "rathenau-assassination",
    date: "24 Jun 1922",
    title: "Assassination of Walther Rathenau",
    category: "Political",
    track: "macro",
    stabilityScore: 4,
    economicImpact: "Foreign exchange rates plummeted; international confidence in Weimar economic stability suffered severe blow.",
    politicalImpact: "Foreign Minister Rathenau (wealthy Jewish industrialist committed to fulfilling treaty obligations) shot dead by ultra-nationalist Organisation Consul. Reichstag passed Law for the Protection of the Republic.",
    naziExploitation: "Hitler praised the murderers' anti-Versailles motives, while Munich became a safe harbor for right-wing terrorists escaping Prussian arrest warrants.",
    keyActors: ["Hitler"]
  },
  {
    id: "mussolini-march",
    date: "28 Oct 1922",
    title: "Mussolini's March on Rome",
    category: "Ideological",
    track: "nsdap",
    stabilityScore: 5,
    economicImpact: "Italian fascist takeover demonstrated that economic chaos and labor strikes could be broken through violent right-wing coup.",
    politicalImpact: "King Victor Emmanuel III buckled and appointed Mussolini Prime Minister without armed resistance.",
    naziExploitation: "Direct tactical model for Hitler. The NSDAP explicitly planned a 'March on Berlin' from Munich, copying Mussolini’s Blackshirt strategy.",
    keyActors: ["Hitler", "Ludendorff"]
  },
  {
    id: "ruhr-invasion",
    date: "11 Jan 1923",
    title: "French & Belgian Invasion of the Ruhr",
    category: "Economic",
    track: "macro",
    stabilityScore: 2,
    economicImpact: "Ruhr produced 80% of German coal and steel. Loss of industrial heartland triggered catastrophically expensive state funding of passive resistance.",
    politicalImpact: "Chancellor Wilhelm Cuno called for 'Passive Resistance' (Passiver Widerstand). French troops shot 132 Germans and expelled 150,000 citizens from the zone.",
    naziExploitation: "Hitler declared: 'No fight against France, but fight against Berlin first! The enemy sits in Berlin, not Paris!' Attacked Weimar weakness for not declaring war.",
    keyActors: ["Hitler", "Ebert"]
  },
  {
    id: "hyperinflation",
    date: "Jul–Nov 1923",
    title: "Peak of Hyperinflation",
    category: "Economic",
    track: "macro",
    stabilityScore: 1,
    economicImpact: "Mark collapsed: $1 = 4.2 trillion marks by Nov 1923. Loaf of bread cost 200 billion marks. People carried wheelbarrows of cash; savings completely wiped out.",
    politicalImpact: "Middle class (Mittelstand) felt economically slaughtered and betrayed by the Republic; civil servants, pensioners, and shopkeepers radicalized.",
    naziExploitation: "Hitler's recruitment exploded to over 50,000 members in Bavaria. He blamed 'Jewish financiers', war profiteers, and the 'Berlin traitors' for deliberately bankrupting Germany.",
    keyActors: ["Hitler"]
  },
  {
    id: "stresemann-resistance",
    date: "26 Sep 1923",
    title: "Stresemann Calls Off Passive Resistance",
    category: "Political",
    track: "macro",
    stabilityScore: 3,
    isSparkTrigger: true,
    economicImpact: "Cut off the printing presses subsidizing striking Ruhr workers; initial essential step towards balancing the national budget.",
    politicalImpact: "Gustav Stresemann realized resistance was destroying the state. Right-wing nationalists branded this the ultimate national betrayal and surrender to France.",
    naziExploitation: "THE SPARK FOR THE PUTSCH: Hitler and the Bavarian right believed the moment for armed national revolt had arrived before Weimar stabilized itself.",
    keyActors: ["Stresemann", "Hitler", "von Kahr"]
  },
  {
    id: "bavaria-emergency",
    date: "26 Sep 1923",
    title: "Bavarian Dictatorship (Triumvirate)",
    category: "Political",
    track: "macro",
    stabilityScore: 2,
    economicImpact: "Bavaria withheld federal tax receipts and defied Berlin economic directives.",
    politicalImpact: "Bavarian government appointed Gustav von Kahr as General State Commissioner with dictatorial powers, alongside General von Lossow (Army) and Colonel von Seisser (Police). Bavaria openly mutinied against Berlin.",
    naziExploitation: "Hitler joined the Kampfbund (coalition of patriotic leagues) with Ludendorff, pressurizing the Triumvirate to lead an armed march on Berlin.",
    keyActors: ["von Kahr", "von Lossow", "Hitler", "Ludendorff"]
  },
  {
    id: "rentenmark-window",
    date: "15 Oct–5 Nov 1923",
    title: "The Closing Window: Currency Reform Announced",
    category: "Economic",
    track: "macro",
    stabilityScore: 4,
    economicImpact: "Decree establishing the Rentenmark backed by mortgages on German agricultural and industrial land, scheduled for mid-November.",
    politicalImpact: "Stresemann and Hjalmar Schacht began restoring monetary stability, threatening to deflate the revolutionary fervor of the masses.",
    naziExploitation: "Closing Window Theory: Hitler knew that once the currency stabilized and hyperinflation abated, his popular support would evaporate. He had to strike immediately.",
    keyActors: ["Stresemann", "Hitler"]
  },
  {
    id: "munich-putsch",
    date: "8–9 Nov 1923",
    title: "The Munich (Beer Hall) Putsch",
    category: "Military & Judiciary",
    track: "nsdap",
    stabilityScore: 2,
    economicImpact: "Temporary panic in Munich markets; immediate clampdown on Bavarian banking networks.",
    politicalImpact: "Hitler burst into Bürgerbräukeller with 600 SA, forced Kahr at gunpoint to support coup. Betrayed by Triumvirate, Hitler marched on Odeonsplatz; 16 Nazis and 4 police killed; NSDAP banned.",
    naziExploitation: "Turned from immediate military humiliation into the founding foundational myth (Blutfahne) of the Nazi movement.",
    keyActors: ["Hitler", "Ludendorff", "von Kahr", "von Lossow", "Seeckt"]
  },
  {
    id: "rentenmark-success",
    date: "15 Nov 1923",
    title: "Introduction of the Rentenmark",
    category: "Economic",
    track: "macro",
    stabilityScore: 7,
    economicImpact: "One Rentenmark exchanged for 1 trillion old paper marks. Strict credit limits instituted; hyperinflation halted overnight ('Miracle of the Rentenmark').",
    politicalImpact: "Demonstrated Weimar's administrative capacity to resolve economic disaster; deprived extremists of their chief economic grievance.",
    naziExploitation: "Demonstrated that Hitler's window of opportunity had definitively shut; economic stabilization ushered in the 'Golden Twenties' (1924-1929).",
    keyActors: ["Stresemann"]
  },
  {
    id: "munich-trial",
    date: "26 Feb–1 Apr 1924",
    title: "The Munich Treason Trial",
    category: "Military & Judiciary",
    track: "nsdap",
    stabilityScore: 5,
    economicImpact: "Cost of trial borne by state; publicity attracted significant donations from nationalist industrialists.",
    politicalImpact: "Sympathetic judge Georg Neithardt gave Hitler an unrestricted platform. Ludendorff acquitted; Hitler sentenced to minimum 5 years in fortress arrest instead of life imprisonment or deportation.",
    naziExploitation: "National stardom: Hitler's speeches reported in every major German daily. He established himself as the undisputed Führer of the German radical right.",
    keyActors: ["Hitler", "Ludendorff"]
  },
  {
    id: "may-1924-elections",
    date: "4 May 1924",
    title: "May 1924 Reichstag Elections",
    category: "Political",
    track: "nsdap",
    stabilityScore: 6,
    economicImpact: "Voters still feeling the residual sting of 1923 inflation punished the moderate coalition parties.",
    politicalImpact: "NSDAP running under the National Socialist Freedom Movement won 32 seats (6.5% of the vote). KPD won 62 seats. Centrist parties squeezed.",
    naziExploitation: "Proved that electoral politics could yield tangible Reichstag representation even while Hitler sat in prison.",
    keyActors: ["Hitler"]
  },
  {
    id: "hitler-release",
    date: "20 Dec 1924",
    title: "Hitler's Early Release & Legal Strategy",
    category: "Ideological",
    track: "nsdap",
    stabilityScore: 7,
    economicImpact: "Dawes Plan loans flowed in from the United States; industrial recovery underway.",
    politicalImpact: "Hitler served only 9 months in Landsberg Fortress; wrote Mein Kampf; formulated the 'Legalitätstaktik' (Legality tactic) to destroy democracy from within.",
    naziExploitation: "Shifted party strategy from violent armed putschism to disciplined mass electoral party with subordinate auxiliary organizations (Hitler Youth, Nazi Students).",
    keyActors: ["Hitler"]
  }
];

export const PUTSCH_BEATS: PutschBeat[] = [
  {
    id: 1,
    time: "8 Nov 1923, 20:00",
    phase: "The Beer Hall Gathering",
    location: "Bürgerbräukeller, Munich",
    keyActors: ["Gustav von Kahr", "Otto von Lossow", "Hans von Seisser"],
    outcome: "Over 3,000 Bavarian officials, aristocrats, and right-wing supporters gathered to hear Kahr speak on the evils of Marxism and Weimar.",
    failureFactor: "Hitler had not secured prior firm agreement; he was forcing the Triumvirate's hand by ambushing their public rally.",
    narrative: "Kahr was in mid-sentence addressing the packed beer hall when armed SA troops suddenly cordoned off the entrances and set up a machine gun in the vestibule."
  },
  {
    id: 2,
    time: "8 Nov 1923, 20:30",
    phase: "Hitler's Pistol Shot",
    location: "Main Hall, Bürgerbräukeller",
    keyActors: ["Adolf Hitler", "Hermann Göring", "Rudolf Hess"],
    outcome: "Hitler entered flanked by SA stormtroopers, jumped onto a chair, fired a Browning pistol into the ceiling, and shouted: 'The National Revolution has broken out!'",
    failureFactor: "Melodramatic theatricality masked weak military coordination; telephone lines out of the hall were not cut immediately.",
    narrative: "Hitler announced that the Bavarian government was deposed and that a new national government was being formed right there in Munich."
  },
  {
    id: 3,
    time: "8 Nov 1923, 20:45",
    phase: "The Side-Room Ultimatum",
    location: "Side Room, Bürgerbräukeller",
    keyActors: ["Adolf Hitler", "Gustav von Kahr", "Otto von Lossow", "Hans von Seisser", "Erich Ludendorff"],
    outcome: "At gunpoint, Hitler demanded the three men join him. They refused until General Ludendorff arrived and appealed to their military honor.",
    failureFactor: "Coerced consent under gunpoint was legally and morally void the moment the triumvirate walked out of Hitler's sight.",
    narrative: "Kahr, Lossow, and Seisser reluctantly shook hands in agreement. Hitler returned to the main hall to triumphant cheers, declaring the march on Berlin had begun."
  },
  {
    id: 4,
    time: "8 Nov 1923, 21:30",
    phase: "SA Tactical Seizures",
    location: "Munich War Ministry & Police HQ",
    keyActors: ["Ernst Röhm", "Heinrich Himmler"],
    outcome: "Röhm led his Reichskriegsflagge paramilitaries to seize the Bavarian War Ministry building at the Schönfeldwiese.",
    failureFactor: "Critical tactical failure: The SA completely failed to capture the main army barracks, railway hubs, and the central telephone exchange.",
    narrative: "Röhm barricaded the War Ministry with barbed wire, but soon found his forces completely surrounded by regular army troops who refused to join him."
  },
  {
    id: 5,
    time: "8 Nov 1923, 22:30",
    phase: "Ludendorff's Fatal Blunder",
    location: "Bürgerbräukeller",
    keyActors: ["Erich Ludendorff", "Gustav von Kahr", "Otto von Lossow"],
    outcome: "While Hitler left to settle a dispute among SA detachments, Ludendorff released Kahr, Lossow, and Seisser upon their 'word of honor as German officers'.",
    failureFactor: "Arrogance of Ludendorff: Believing old imperial officers would never break their gentleman's oath to a wartime quartermaster-general.",
    narrative: "The instant they reached safety outside the beer hall, the trio revoked their coerced promises, alerted army units, and began organizing the suppression of the putsch."
  },
  {
    id: 6,
    time: "9 Nov 1923, 02:45",
    phase: "The Triumvirate Repudiation",
    location: "Munich City Commander's Office",
    keyActors: ["Gustav von Kahr", "General Hans von Seeckt (Berlin)"],
    outcome: "Kahr issued an official radio broadcast and wall posters denouncing Hitler's 'mad enterprise' and officially banning the NSDAP and SA.",
    failureFactor: "In Berlin, President Ebert transferred executive emergency powers to General von Seeckt, who made it clear the national Reichswehr would crush the rebellion.",
    narrative: "Hitler's political bluff had failed before sunrise. The Munich police and army units received explicit orders to shoot to kill if rebels marched."
  },
  {
    id: 7,
    time: "9 Nov 1923, 11:30",
    phase: "The Desperate March",
    location: "Isar River Bridge towards City Center",
    keyActors: ["Adolf Hitler", "Erich Ludendorff", "Hermann Göring", "Julius Streicher"],
    outcome: "With Röhm trapped at the War Ministry, Hitler and Ludendorff launched a desperate march with ~2,500 armed men into the city centre to win over the populace.",
    failureFactor: "Townspeople were mostly indifferent or frightened; no mass spontaneous uprising occurred. The putschists were outgunned and outmatched.",
    narrative: "Linking arms in the front rank, Hitler and Ludendorff led the column across the Ludwig Bridge. Ludendorff arrogantly insisted: 'The police will never shoot at me!'"
  },
  {
    id: 8,
    time: "9 Nov 1923, 12:30",
    phase: "Clash at the Feldherrnhalle",
    location: "Residenzstraße / Odeonsplatz",
    keyActors: ["State Police Lieutenant Baron von Godin", "Adolf Hitler", "Max Erwin von Scheubner-Richter"],
    outcome: "A detachment of 130 state police blocked the narrow street. An unknown shot was fired; a sixty-second gun battle ensued. 14 Nazis and 4 policemen were killed.",
    failureFactor: "State police stayed loyal to their orders. When Hitler's bodyguard Scheubner-Richter was shot dead, he pulled Hitler down, dislocating Hitler's left shoulder.",
    narrative: "Göring was shot in the groin; stormtroopers scattered in terror and dived onto the pavement. Only Ludendorff kept walking upright directly through the police line and was arrested."
  },
  {
    id: 9,
    time: "9 Nov 1923, 13:00",
    phase: "Flight and Disintegration",
    location: "Streets of Munich / Austrian Border",
    keyActors: ["Adolf Hitler", "Hermann Göring", "Ernst Röhm"],
    outcome: "Hitler was shoved into a yellow medical car and sped away into hiding. Göring was smuggled wounded over the Austrian border. Röhm surrendered at the War Ministry.",
    failureFactor: "Complete collapse of leadership morale. Hitler's revolutionary bravado gave way to panicked evasion.",
    narrative: "Within an hour, the putsch had evaporated into chaos. Munich streets were cleared by armored cars, and the party was banned across Germany."
  },
  {
    id: 10,
    time: "11 Nov 1923",
    phase: "Arrest at Uffing Villa",
    location: "Villa Hanfstaengl, Uffing am Staffelsee",
    keyActors: ["Adolf Hitler", "Helene Hanfstaengl"],
    outcome: "Munich police detectives arrested Hitler hiding in the attic wardrobe of Ernst Hanfstaengl's country home; Helene Hanfstaengl reportedly talked him out of suicide.",
    failureFactor: "Total military catastrophe: The party was banned, assets seized, leadership arrested, and 16 'martyrs' buried.",
    narrative: "Hitler was transferred under heavy guard to Landsberg Fortress, where he expected to be tried for high treason carrying potential capital punishment or life imprisonment."
  }
];

export const JUDICIAL_BIAS_DATA: JudicialBiasComparison[] = [
  {
    id: "treason-statute",
    aspect: "Reich Treason Statute (Section 81)",
    legalStandard: "Reich Criminal Code §81: Mandatory sentence of death or life imprisonment at hard labor for attempting to overthrow the constitutional government by force.",
    hitlerTreatment: "Sentenced to minimum 5 years fortress confinement (Festungshaft). Judge Neithardt explicitly granted eligibility for early parole after just 6 months.",
    leftWingContrast: "1919 Munich Soviet leaders: Eugen Leviné condemned to death and executed by firing squad; Ernst Toller sentenced to 5 years hard labor.",
    historicalSignificance: "Demonstrated the judiciary's foundational antipathy toward the Republic: judges treated right-wing armed coup as 'patriotic error' but left-wing activity as criminal treason."
  },
  {
    id: "deportation-law",
    aspect: "Deportation of Foreign Citizens",
    legalStandard: "1922 Law for the Protection of the Republic §9: Mandatory deportation of any foreign national convicted of high treason against Germany.",
    hitlerTreatment: "Hitler was legally an Austrian citizen (stateless in Germany until 1932). Judge Neithardt waived deportation, declaring: 'The law cannot apply to a man who thinks and feels as German as Hitler.'",
    leftWingContrast: "Foreign-born socialists, Polish-Jewish workers, and Russian communists were routinely deported summarily upon suspicion of political agitation.",
    historicalSignificance: "Single judicial decision saved Hitler's political career; deportation to Austria would have ended his German political ambitions permanently."
  },
  {
    id: "courtroom-conduct",
    aspect: "Control of Courtroom & Speech Time",
    legalStandard: "Judges strictly forbid defendants from using the bench for political propaganda; disruptive speeches constitute contempt of court.",
    hitlerTreatment: "Hitler was allowed to cross-examine state witnesses, interrupt prosecutors, and deliver continuous 4-hour political speeches to packed galleries and reporters.",
    leftWingContrast: "Leftist defendants were silenced, had their legal counsel shouted down by judges, and were denied press transcripts.",
    historicalSignificance: "Turned an embarrassing military fiasco into national celebrity: every German newspaper published Hitler's passionate attacks on Versailles and Weimar."
  },
  {
    id: "ludendorff-treatment",
    aspect: "General Ludendorff Verdict",
    legalStandard: "Co-leader of an armed insurrection with 2,500 armed men marching against state police in high treason.",
    hitlerTreatment: "Ludendorff was completely ACQUITTED on the absurd pretext that he was 'present only by accident' (the exact same excuse he used in the 1920 Kapp Putsch!).",
    leftWingContrast: "Every military member or soldier involved in the Red Army of the Ruhr was sentenced to heavy prison terms or executed in field courts.",
    historicalSignificance: "Proved that the old Imperial officer class remained untouchable within the Weimar judicial apparatus."
  },
  {
    id: "prison-conditions",
    aspect: "Incarceration Conditions & Parole",
    legalStandard: "High treason prisoners held under strict penitentiary surveillance with restricted visits and mail censorship.",
    hitlerTreatment: "Served only 9 months in Landsberg Fortress in a sunny private room; allowed endless visitors, flowers, cakes, gifts, and dictated 'Mein Kampf' to Rudolf Hess.",
    leftWingContrast: "Left-wing prisoners kept in damp, solitary confinement cells with hard labor and restricted diets.",
    historicalSignificance: "Landsberg functioned as a comfortable retreat where Hitler codified his political ideology and organized the future reconstruction of the party."
  },
  {
    id: "overall-statistics",
    aspect: "Weimar Justice Statistics (1919-1922 Gumbel Study)",
    legalStandard: "Statistically equal application of penal sanctions regardless of ideological motivation.",
    hitlerTreatment: "Right-wing murders (354 incidents): Only 1 convicted to severe penalty; 0 death sentences; average sentence: 4 months.",
    leftWingContrast: "Left-wing murders (22 incidents): 10 death sentences executed; 17 long prison terms; average sentence: 15 years.",
    historicalSignificance: "Emil Gumbel’s famous contemporary study coined the maxim: 'Justiz auf dem rechten Auge blind' (Justice blind in the right eye)."
  }
];

export const HISTORIOGRAPHICAL_DEBATES: HistoriographicalDebate[] = [
  {
    id: 1,
    topic: "Setting up of the Weimar Republic",
    statementA: {
      text: "The fact that many of the old elite were prepared to support the new regime was promising.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Civil service, judiciary, and business leaders ensured continuous state functioning, food supplies, and public order during the chaotic transition from monarchy."
    },
    statementB: {
      text: "The initial support from the elite for the new regime was purely tactical and ominously fragile.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "Elites tolerated democracy only as a temporary shield against Bolshevism; their reactionary mindset remained intact and sabotaged the Republic from within."
    }
  },
  {
    id: 2,
    topic: "Nature of the German Revolution",
    statementA: {
      text: "The creation of a democratic republic must be considered as a genuine revolution.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Overthrew the Hohenzollern dynasty, introduced universal suffrage for men and women, established civil liberties, and created parliamentary supremacy."
    },
    statementB: {
      text: "The events were a limited, unrevolutionary revolution from below that crushed real social reform.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "Left traditional socioeconomic power structures (Junkers, industrial cartels, imperial army) untouched, creating a 'republic without republicans'."
    }
  },
  {
    id: 3,
    topic: "Ebert's Role & Pragmatism",
    statementA: {
      text: "Ebert correctly judged the mood of the German people and was justified using the army to maintain order.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Majority of working Germans favored democratic elections, not Russian-style Soviet dictatorship; his pact with Groener averted civil war and starvation."
    },
    statementB: {
      text: "Ebert was a traitor to working-class unity whose reliance on Freikorps fatally poisoned the left.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "Murder of Luxemburg and Liebknecht created an unbridgeable chasm between SPD and KPD, leaving the Republic divided against right-wing resurgence."
    }
  },
  {
    id: 4,
    topic: "The Armistice & Surrender",
    statementA: {
      text: "The Armistice was urgently sought by the Generals (Ludendorff/Hindenburg) and cannot be blamed on civilians.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Imperial High Command explicitly notified the Kaiser on 29 Sept 1918 that the military front was about to collapse within 24 hours."
    },
    statementB: {
      text: "The new republican government was politically unwise to accept the Armistice without clarifying military guilt.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "By sending civilian politician Matthias Erzberger to sign the surrender, the army escaped blame and manufactured the toxic 'stab-in-the-back' myth."
    }
  },
  {
    id: 5,
    topic: "The Versailles Treaty",
    statementA: {
      text: "Considering the Allied victory, Versailles was understandable; Germany remained Europe's dominant industrial power.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Germany remained intact territorially in its core, with greater industrial potential than France; reparations were subject to realistic renegotiation."
    },
    statementB: {
      text: "The Treaty of Versailles was an act of punitive irresponsibility that doomed the nascent Republic.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "War Guilt Clause 231, loss of Posen and Danzig corridor, and astronomical reparations permanently delegitimized democracy in German public opinion."
    }
  },
  {
    id: 6,
    topic: "The Weimar Constitution",
    statementA: {
      text: "The constitution was a well-considered mix of democracy and protective emergency safeguards.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Article 48 was designed as a constitutional defense mechanism to save the state in crisis, and Ebert used it successfully to crush insurrections."
    },
    statementB: {
      text: "The constitution was structurally defective and too democratic for the bitter post-war environment.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "Pure proportional representation encouraged extremist splinter parties and unstable coalitions; Article 48 became an authoritarian gateway."
    }
  },
  {
    id: 7,
    topic: "The Kapp Putsch (1920)",
    statementA: {
      text: "The defeat of the Kapp Putsch illustrates the decisive strength of democratic and working-class forces.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "The largest general strike in German history brought Berlin to a complete standstill, forcing Wolfgang Kapp and his conspirators to flee within 5 days."
    },
    statementB: {
      text: "The Kapp Putsch revealed that the Reichswehr was disloyal and that Weimar was living on borrowed time.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "General von Seeckt refused to defend the elected government, declaring 'Reichswehr does not fire on Reichswehr'; judges pardoned almost all conspirators."
    }
  },
  {
    id: 8,
    topic: "The Communist Threat (KPD)",
    statementA: {
      text: "The Communists posed an existential revolutionary threat between 1919 and 1923.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Armed uprisings in Berlin (1919), Ruhr Red Army (1920), March Action (1921), and German October in Saxony/Hamburg (1923) required heavy military suppression."
    },
    statementB: {
      text: "The Communists were divided, tactically inept, and served merely as a right-wing boogeyman.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "KPD lacked disciplined military organization, received erratic Comintern directives, and was easily neutralized whenever the army moved."
    }
  },
  {
    id: 9,
    topic: "Causes of the Hyperinflation",
    statementA: {
      text: "German governments deliberately ran reckless deficits and printed money to evade reparations.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "Financing war debt through loans rather than taxation, followed by state subsidies for passive resistance in the Ruhr, caused monetary hyper-expansion."
    },
    statementB: {
      text: "Allied reparation demands and the French occupation of the Ruhr bear primary responsibility.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Depriving Germany of 80% of its coal and steel production while demanding gold mark reparations made a stable currency mathematically impossible."
    }
  },
  {
    id: 10,
    topic: "Significance of Hyperinflation Crisis",
    statementA: {
      text: "The fact that the Weimar regime overcame hyperinflation demonstrates remarkable administrative resilience.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Stresemann and Schacht successfully introduced the Rentenmark without foreign loans, stabilized the budget, and negotiated the Dawes Plan in 1924."
    },
    statementB: {
      text: "The hyperinflation permanently traumatized the Mittelstand and destroyed moral faith in the Republic.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "Wiping out life savings, pensions, and middle-class security severed bourgeois loyalty to democracy, priming them for radical right voting in 1930."
    }
  },
  {
    id: 11,
    topic: "Hitler's Munich Putsch (1923)",
    statementA: {
      text: "Hitler's putsch was a farcical, minor fiasco easily dispersed by 130 Bavarian police officers.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "The rebellion collapsed within hours; the German public refused to join; the Bavarian state apparatus remained loyal to law and order."
    },
    statementB: {
      text: "The Putsch was a watershed moment that catapulted Hitler to national fame and birthed the legal strategy.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "The 1924 trial gave Hitler international publicity, judicial complicity shielded him from deportation, and he learned to subvert democracy from within."
    }
  },
  {
    id: 12,
    topic: "Overall Survival Judgement: 'Lucky to Survive 1923?'",
    statementA: {
      text: "The Republic survived because of genuine institutional strengths, decisive leadership, and popular support.",
      interpretation: "Weimar Strength / Structural Resilience",
      evidence: "Stresemann's courage in ending passive resistance, Ebert's use of Article 48, the Rentenmark miracle, and trade union defense of democracy."
    },
    statementB: {
      text: "The Republic survived largely through the division and sheer incompetence of its enemies.",
      interpretation: "Weimar Weakness / Fortuitous Survival",
      evidence: "Hitler and the Bavarian triumvirate turned on each other; the army was disloyal; the state was saved by timing and lucky economic breathing space."
    }
  }
];

export const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    id: "ev-trade-union-strike",
    title: "Trade Union & SPD General Strike (Kapp Putsch, 1920)",
    category: "Political",
    dateRange: "March 1920",
    summary: "Massive nationwide worker mobilization brought the capital to a total standstill and forced the putschists out in 5 days.",
    analyticalDetail: "Demonstrates that organized labor and the working-class mass movement were fiercely committed to defending democratic institutions against reactionary monarchist coups.",
    defaultBias: "strength"
  },
  {
    id: "ev-stresemann-rentenmark",
    title: "Stresemann & Schacht's Currency Stabilization (Rentenmark)",
    category: "Economic",
    dateRange: "Autumn 1923",
    summary: "Decisive fiscal courage to call off passive resistance and create a land-mortgage-backed currency that halted hyperinflation.",
    analyticalDetail: "Exhibits effective technocratic and administrative competence within the Weimar executive, proving the regime could solve catastrophic structural problems without collapsing.",
    defaultBias: "strength"
  },
  {
    id: "ev-ebert-article-48",
    title: "Ebert's Constructive Use of Article 48 Powers",
    category: "Political",
    dateRange: "1919–1923",
    summary: "President Ebert invoked emergency powers over 130 times not to destroy democracy, but to protect it from extremist uprisings.",
    analyticalDetail: "Used constitutionally to defeat both Communist revolts (Ruhr, Saxony, Hamburg) and armed right-wing rebellions, demonstrating executive will to defend the state.",
    defaultBias: "strength"
  },
  {
    id: "ev-police-feldherrnhalle",
    title: "Bavarian State Police Resistance at Feldherrnhalle",
    category: "Military",
    dateRange: "9 November 1923",
    summary: "130 armed state police stood firm under fire and fired on Ludendorff and Hitler's column at the Odeonsplatz.",
    analyticalDetail: "Proves that when commanded by lawful authority, the police apparatus would defend the rule of law and disperse armed insurrections.",
    defaultBias: "strength"
  },
  {
    id: "ev-dawes-plan",
    title: "Diplomatic Realignment & Dawes Plan (1924)",
    category: "Economic",
    dateRange: "April–August 1924",
    summary: "Weimar diplomacy secured international loans (800 million gold marks) and scaled reparation payments.",
    analyticalDetail: "Proves the Republic was internationally resilient and capable of restoring economic equilibrium via negotiation (Erfüllungspolitik) rather than warfare.",
    defaultBias: "strength"
  },
  {
    id: "ev-communist-defeat",
    title: "Systematic Suppression of KPD Invasions (1919–1923)",
    category: "Military",
    dateRange: "1919–1923",
    summary: "Spartacists, Ruhr Red Army, and the 1923 German October in Saxony/Thuringia were all defeated rapidly.",
    analyticalDetail: "Demonstrates that the infant state had overwhelming military capacity to suppress radical left-wing challenges to parliamentary democracy.",
    defaultBias: "strength"
  },
  {
    id: "ev-judicial-leniency",
    title: "Judicial Sympathy for Right-Wing Traitors ('Justiz auf dem rechten Auge blind')",
    category: "Judicial",
    dateRange: "1920–1924",
    summary: "Hitler served 9 months in luxury for armed treason; Ludendorff acquitted; foreign deportation statute illegally waived.",
    analyticalDetail: "Crucial proof of internal state decay: the judiciary remained monarchist, openly protected anti-democratic rightists, and sabotaged the constitutional order.",
    defaultBias: "weakness"
  },
  {
    id: "ev-seeckt-army-neutrality",
    title: "General von Seeckt's Ambivalence ('Reichswehr does not fire on Reichswehr')",
    category: "Military",
    dateRange: "March 1920 / Nov 1923",
    summary: "Army leadership refused to guarantee defense of the Republic against right-wing nationalist insurrections.",
    analyticalDetail: "Weimar survived by luck and military forbearance, because the army operated as an autonomous 'state within a state' rather than a republican defense force.",
    defaultBias: "weakness"
  },
  {
    id: "ev-bavarian-sanctuary",
    title: "Bavarian Government Defiance & Triumvirate Mutiny",
    category: "Political",
    dateRange: "September–November 1923",
    summary: "Kahr, Lossow, and Seisser declared an emergency, defied Berlin orders, and harbored illegal anti-republican paramilitaries.",
    analyticalDetail: "Shows severe federal disintegration: Weimar was powerless to enforce Reich law in Bavaria without risking a catastrophic civil war between Munich and Berlin.",
    defaultBias: "weakness"
  },
  {
    id: "ev-putschist-blunders",
    title: "Incompetence of Putschist Conspirators (Nov 8–9, 1923)",
    category: "Military",
    dateRange: "8–9 November 1923",
    summary: "Ludendorff naively released the Triumvirate; SA failed to cut phone lines or seize army barracks; march was an improvised gamble.",
    analyticalDetail: "Suggests the Republic survived in Munich primarily because Hitler and Ludendorff made amateur tactical blunders, not because the state was fortified.",
    defaultBias: "weakness"
  },
  {
    id: "ev-mittelstand-trauma",
    title: "Psychological Destruction of the Middle Class (Hyperinflation)",
    category: "Social",
    dateRange: "1922–1923",
    summary: "Mittelstand savings, war bonds, and pensions were erased, breeding permanent hatred for the democratic system.",
    analyticalDetail: "While the currency was rescued technically, the social bedrock of German moderate liberalism was permanently destroyed, guaranteeing future vulnerability.",
    defaultBias: "weakness"
  },
  {
    id: "ev-dolchstoss-versailles",
    title: "Pervasive 'Dolchstoßlegende' & Resentment of the 'Diktat'",
    category: "Political",
    dateRange: "1919–1924",
    summary: "Broad swaths of the German public viewed Weimar as a creature of treason and foreign subjugation.",
    analyticalDetail: "Democracy lacked broad moral legitimacy; anti-republican agitators could weaponize the 'stab in the back' and Versailles at any moment of economic strain.",
    defaultBias: "weakness"
  },
  {
    id: "ev-proportional-instability",
    title: "Chronic Coalition Fragility & Polarization (1919–1924)",
    category: "Political",
    dateRange: "1919–1924",
    summary: "Weimar saw eight successive cabinet collapses in five years as moderate coalitions fractured over foreign policy and welfare.",
    analyticalDetail: "Inherent constitutional dysfunction: proportional representation made stable democratic majorities nearly impossible during economic crises.",
    defaultBias: "weakness"
  },
  {
    id: "ev-narrow-timing-window",
    title: "The Narrow 'Closing Window' of November 1923",
    category: "Economic",
    dateRange: "November 1923",
    summary: "Hitler struck only days before the Rentenmark halted inflation; had monetary collapse lasted 6 more weeks, rebellion could have spread nationwide.",
    analyticalDetail: "Underscores historical contingency and luck: a few weeks of delay in monetary reform would have expanded the Putsch into a nationwide conflagration.",
    defaultBias: "weakness"
  }
];

export const INQUIRY_PROMPTS: InquiryPrompt[] = [
  {
    id: "prompt-point25",
    trigger: "point-25",
    title: "Inquiry: Point 25 & The Bavarian Paradox",
    question: "How does the demand for a 'strong central power' in 1920 (Point 25) contrast with the Bavarian Separatism Hitler tried to exploit in 1923?",
    context: "In 1920, the NSDAP Program demanded 'unconditional authority of the central Parliament over the entire Reich.' Yet in Munich, Hitler cultivated relationships with Bavarian monarchists and particularists (like von Kahr) who despised Berlin centralism.",
    aqaGuidance: {
      ao1: "Demonstrate accurate historical knowledge of the 25-Point Program (Point 25: Strong central Reich authority) and the political conditions in Bavaria (Bavaria as an 'Ordnungszelle' or cell of order harboring anti-Berlin separatists).",
      ao2: "Analyze the ideological contradiction and tactical opportunism: Hitler was a radical Pan-German centralist who used Bavarian state autonomy as a regional fortress only until he could seize national power in Berlin.",
      modelPoints: [
        "Point 25 explicitly demanded the eradication of federal state autonomy in favor of total Reich centralization.",
        "Gustav von Kahr and Bavarian conservatives sought Bavarian autonomy or the restoration of the Wittelsbach monarchy.",
        "Hitler engaged in tactical pragmatism: flattering Bavarian separatists to protect his paramilitary SA from Prussian police.",
        "During the Putsch, this contradiction ruptured: Kahr wanted a conservative Bavarian-led directorate, whereas Hitler demanded immediate subordination to his national dictatorship."
      ]
    }
  },
  {
    id: "prompt-trial-outcome",
    trigger: "trial-1924",
    title: "Inquiry: The Trial & Hitler's Legalitätstaktik",
    question: "Evaluate the extent to which the 1924 trial was more significant than the Putsch itself. Consider Hitler's shift to the 'Legal Strategy' (Legalitätstaktik).",
    context: "The Munich Putsch of November 1923 was a humiliating military failure on the streets of Munich. However, the trial in February–April 1924 turned into a triumphant propaganda campaign that reshaped Nazi strategy.",
    aqaGuidance: {
      ao1: "Detail the trial proceedings: Judge Georg Neithardt's bias, the leniency of the 5-year sentence (released after 9 months), acquittal of Ludendorff, failure to deport Hitler under §9 of the Protection of the Republic Law, and the publication of Mein Kampf.",
      ao2: "Evaluate change and continuity in Nazi tactics: compare the armed putschist approach (inspired by Mussolini's March on Rome) with the post-1924 strategy of winning power through democratic elections to dismantle democracy from within.",
      modelPoints: [
        "In the short term, the Putsch was a military disaster: 16 Nazis dead, party banned, leaders imprisoned or in exile.",
        "The trial transformed Hitler from a regional Munich beer hall agitator into a nationally recognized martyr of the nationalist right.",
        "Crucial realization: democracy could not be overthrown by frontal assault against the Reichswehr; it had to be dismantled using its own constitutional mechanisms.",
        "In Landsberg, Hitler codified his racial world view in Mein Kampf and built a disciplined, country-wide political party apparatus."
      ]
    }
  },
  {
    id: "prompt-closing-window",
    trigger: "closing-window",
    title: "Inquiry: The 'Closing Window' & Economic Luck",
    question: "If the Rentenmark had been introduced two months later, would the Putsch have succeeded? Support with evidence from the 'Crisis Chronicle'.",
    context: "Historians often highlight the 'Closing Window' theory: Hitler knew that Gustav Stresemann's courageous decisions (ending passive resistance and preparing the Rentenmark) would restore economic normalcy, destroying extremist momentum.",
    aqaGuidance: {
      ao1: "Reference chronological data: French Ruhr occupation (Jan 1923), hyperinflation peak (Summer/Autumn 1923), Stresemann ending passive resistance (Sept 1923), and the Rentenmark decree (Nov 1923).",
      ao2: "Assess causality and historical contingency: evaluate whether Nazi success depended primarily on economic misery or on elite/military backing.",
      modelPoints: [
        "Prolonged hyperinflation would have intensified popular desperation and middle-class radicalization.",
        "However, Putsch failure was primarily military and organizational: the Army under General von Seeckt and the Bavarian police remained unwilling to surrender power to Hitler.",
        "Even with worse economic distress, a march on Berlin without the Reichswehr was militarily doomed to fail against regular troops.",
        "Therefore, economic stabilization narrowed Hitler's propaganda appeal, but the lack of elite and military support was the decisive factor in his failure."
      ]
    }
  },
  {
    id: "prompt-weimar-survival",
    trigger: "historiography-workbench",
    title: "Inquiry: Weimar Survival - Strength vs. Weakness of Enemies",
    question: "The Weimar Republic was lucky to survive beyond 1923. Assess the validity of this view.",
    context: "A central debate in AQA A-Level History: Did Weimar survive the catastrophic crises of 1919–1923 through its own institutional resilience, or was it merely saved by the incompetence and divisions of its enemies?",
    aqaGuidance: {
      ao1: "Deploy balanced evidence from 1919 to 1923: Kapp Putsch, Spartacist revolt, Ruhr invasion, Hyperinflation, Ebert-Groener pact, Rentenmark, and the Munich Putsch.",
      ao2: "Construct an evidence-grounded, synoptic historical argument reaching a nuanced judgement on whether survival represented resilience or temporary borrowed time.",
      modelPoints: [
        "Arguments for Strength: Resilient civil service; working-class strike power (Kapp Putsch); Stresemann's decisive leadership; successful Rentenmark currency reform.",
        "Arguments for Luck/Weakness of Enemies: Military disloyalty ('Reichswehr does not fire on Reichswehr'); judicial bias shielding right-wing treason; Hitler and Ludendorff's amateur tactical errors in Munich.",
        "Synoptic Judgement: Weimar demonstrated short-term survival capacity in 1923, but the economic and psychological scars (loss of middle-class faith, unpunished right-wing violence) created structural vulnerabilities that proved fatal after 1929."
      ]
    }
  }
];
