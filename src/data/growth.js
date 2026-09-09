import { images } from './images';
import { divisions } from './divisions';

// Current approved copy and statistics come from the content-migration AGENTS.md.
// Biographies and the Ekodrop case study come from prd-extracted.txt. Missing
// assets and publication details stay explicit; previews do not imply live access.
export const stats = [
  { value: 35, prefix: '₦', suffix: 'B+', label: 'Funding needs facilitated', note: 'Funding demand & capital structuring' },
  { value: 150, suffix: '+', label: 'Businesses supported', note: 'Across strategy, capital, talent & technology' },
  { value: 83, suffix: '%', label: 'Client retention', note: 'Built on long-term partnerships' },
  { value: 10, suffix: '+', label: 'Years experience', note: 'Supporting business growth and execution' },
];

export const solutions = Object.entries(divisions).map(([key, division]) => ({
  ...division, key, title: division.name, features: division.modules, to: `/concierge/${key}`,
}));

export const ecosystem = [
  { id: 'strategy', title: 'Strategy', icon: 'compass', description: 'Business transformation, governance, planning and growth strategy.', to: '/concierge/business' },
  { id: 'capital', title: 'Capital', icon: 'capital', description: 'Funding solutions, investment readiness and financial structuring.', to: '/concierge/financial' },
  { id: 'talent', title: 'Talent', icon: 'people', description: 'Leadership development, workforce capability and knowledge solutions.', to: '/concierge/education' },
  { id: 'technology', title: 'Technology', icon: 'technology', description: 'Digital transformation, software solutions and automation.', to: '/concierge/technology' },
];

export const processSteps = [
  { title: 'Diagnose', icon: 'search', description: 'Understand your business challenges, opportunities and objectives.' },
  { title: 'Design', icon: 'compass', description: 'Develop the right strategy, structure and roadmap.' },
  { title: 'Connect', icon: 'network', description: 'Connect businesses with capital, talent, technology and partners.' },
  { title: 'Execute', icon: 'layers', description: 'Support implementation and measurable execution.' },
  { title: 'Scale', icon: 'growth', description: 'Build systems that enable sustainable growth.' },
];

export const products = [
  { slug: 'assessacad', name: 'AssessAcad', category: 'Learning & assessment', description: 'Digital assessment and learning platform supporting education and workforce development.', image: images.assessacad, status: 'Product preview', focus: ['Assessment needs', 'Learning journeys', 'Capability development'] },
  { slug: 'gadafunds', name: 'GadaFunds', category: 'Capital & communities', description: 'Financial technology solution connecting businesses with funding opportunities.', image: images.gadafunds, status: 'Product preview', focus: ['Business funding needs', 'Capital access goals', 'Platform suitability'] },
  { slug: 'logistics-platform', name: 'Logistics Platform', category: 'Logistics & operations', description: 'Technology-driven solutions improving logistics operations.', image: images.logisticsPlatform, status: 'Product preview', focus: ['Dispatch workflows', 'Delivery visibility', 'Operational requirements'] },
  { slug: 'cadna-mart', name: 'CADNA-Mart', category: 'Commerce & marketplaces', description: 'Digital marketplace supporting business transactions and growth.', image: images.cadnaMart, status: 'Product preview', focus: ['Marketplace needs', 'Buyer and seller journeys', 'Commerce operations'] },
];

export const audiences = [
  { title: 'Entrepreneurs', icon: 'spark', description: 'Turn an idea into a structured, launch-ready business.', stage: 'From idea to enterprise' },
  { title: 'SMEs', icon: 'growth', description: 'Strengthen your operations and prepare for your next stage.', stage: 'From traction to scale' },
  { title: 'Corporates', icon: 'building', description: 'Connect transformation priorities with coordinated execution.', stage: 'From complexity to clarity' },
  { title: 'Investors', icon: 'capital', description: 'Discuss opportunities, readiness and enterprise development.', stage: 'Capital with direction' },
  { title: 'Institutions', icon: 'institution', description: 'Build capability and develop programmes around business growth.', stage: 'Enterprise at ecosystem scale' },
  { title: 'Strategic Partners', icon: 'network', description: 'Bring complementary expertise into a connected growth ecosystem.', stage: 'Shared ambition, collective progress' },
];

export const industries = [
  { title: 'Financial Services', icon: 'capital', description: 'Business models, digital operations and organizational capability.' },
  { title: 'Logistics', icon: 'truck', description: 'Connected delivery workflows and stronger operating structures.' },
  { title: 'Real Estate', icon: 'building', description: 'Project strategy, business structuring and growth planning.' },
  { title: 'Energy', icon: 'energy', description: 'Enterprise development, partnerships and operational readiness.' },
  { title: 'Education', icon: 'book', description: 'Learning platforms, institutional capability and leadership.' },
  { title: 'Technology', icon: 'technology', description: 'Product direction, digital transformation and scalable operations.' },
  { title: 'Agriculture', icon: 'leaf', description: 'Business systems and connections across the agricultural value chain.' },
  { title: 'Infrastructure', icon: 'layers', description: 'Project preparation, partner coordination and execution planning.' },
  { title: 'Consumer Businesses', icon: 'shop', description: 'Business systems, customer experience and growth planning for consumer-facing enterprises.' },
];

export const caseStudies = [
  {
    slug: 'ekodrop-logistics', client: 'Ekodrop Logistics', category: 'Logistics · Integrated transformation', image: images.business,
    headline: 'Connecting technology, capital and capability.',
    challenge: 'Manual dispatch, cash collection and no tracking.',
    role: 'Integrated Technology Concierge, Financial Concierge and Education Concierge support.',
    solution: 'A custom logistics platform, working capital facility and driver training academy.',
    outcome: '300% growth in 18 months and a ₦500M+ revenue run rate.',
    metrics: [['300%', 'Growth in 18 months'], ['₦500M+', 'Revenue run rate']],
  },
  {
    slug: 'forthcoming', client: 'Client to be announced', category: 'Next case study', image: images.collaboration,
    headline: 'More stories of growth, coming soon.', placeholder: true,
    challenge: 'Challenge details forthcoming.', role: 'CADNA intervention to be published.',
    solution: 'Solution details forthcoming.', outcome: 'Verified outcomes to be published.',
  },
];

export const leadership = [
  { name: 'Eventus Agwu-Idam', title: 'Chief Concierge & Managing Partner', initials: 'EA', image: null, linkedin: null, expertise: ['MSME scaling', 'Capital structuring', 'Ecosystem building'], biography: 'Over 20 years driving business transformation across Africa. Architect of CADNA’s integrated model, bringing operational depth to strategic advisory and execution.' },
  { name: 'Stephanie Okpala', title: 'Chief Operating Officer', initials: 'SO', image: null, linkedin: null, expertise: ['Process optimization', 'Risk management', 'Client success'], biography: 'An operations leader with experience across banking, agriculture and professional services, focused on coordinated delivery and organizational performance.' },
  { name: 'Olawande Olowoyeye', title: 'International Concierge — Asia', initials: 'OO', image: null, linkedin: null, expertise: ['International trade', 'Business development', 'Cross-border partnerships'], biography: 'Over 15 years in international trade and business development, connecting opportunities and strategic partnerships across Asia and Africa.' },
];

// Editorial previews: original draft copy, not represented as published posts.
export const insights = [
  { slug: 'structure-before-scale', title: 'Why structure comes before scale', category: 'Business strategy', image: images.boardroom, date: null, summary: 'A practical starting point for businesses preparing for their next chapter.', sections: [
    ['Start with the constraint', 'Growth can expose the gaps that a small team has been working around. Before adding new products, markets or people, look at where decisions stall and where the same problem keeps returning. A useful growth conversation begins with a specific constraint, rather than a list of disconnected projects.'],
    ['Make ownership visible', 'Map your most important workflows and name the person responsible for each outcome. Clarify where a decision belongs, what information it needs and when it should move to someone else. The aim is a structure that helps people act with confidence.'],
    ['Connect the plan', 'Consider your strategy, people, capital needs and technology together. A new market may require operational changes as well as commercial effort. Give each priority a clear owner, a practical milestone and a way to review progress.'],
    ['Choose a manageable first step', 'Start with one area where better coordination could make a visible difference. Review what changes, listen to the people doing the work and use that learning to shape the next stage. A strong operating structure should support the business as it develops.'],
  ] },
  { slug: 'technology-starts-with-workflows', title: 'Better technology starts with better questions', category: 'Technology', image: images.technology, date: null, summary: 'Define the work before deciding which system should do it.', sections: [
    ['Describe the work first', 'Begin with the journey a customer or colleague needs to complete. Identify the steps, handoffs and information involved. A clear picture of today’s workflow gives your team something concrete to improve and helps keep the technology conversation tied to an actual business need.'],
    ['Listen across the business', 'Invite the people who use the process every day to describe what slows them down. Compare that experience with management priorities and customer expectations. Shared understanding helps a team decide which problems matter most.'],
    ['Define a useful outcome', 'Describe what a better experience would look like before creating a feature list. It might mean clearer ownership, fewer repeated entries or more visibility across a team. Agree on how you will review that outcome together.'],
    ['Plan for adoption', 'Leave room for training, feedback and adjustments to the way people work. Introduce changes in manageable stages and make responsibility for ongoing support clear. The conversation should include both the system and the people who will depend on it.'],
  ] },
  { slug: 'learning-that-connects-to-execution', title: 'Connecting team learning to everyday execution', category: 'Talent & leadership', image: images.education, date: null, summary: 'Turn a development priority into something your team can practise.', sections: [
    ['Begin with a real situation', 'Choose a task or decision your team needs to handle more confidently. Describe what happens today and what good work would look like. This gives a development conversation a clear purpose and helps participants connect learning to their own responsibilities.'],
    ['Make space for practice', 'Build an opportunity to apply new ideas into the work that follows a learning session. Keep the first exercise focused and make support available. Ask the team what they noticed and where the approach needs to adapt to their context.'],
    ['Support the managers', 'Managers need a shared understanding of the capability being developed. Agree how they will give feedback, recognize progress and help people work through difficulties. Learning becomes easier to sustain when it has a place in regular team conversations.'],
    ['Review and adjust', 'Return to the original situation and discuss what has changed. Combine the team’s experience with relevant observations from their work. Use that review to choose the next practical step, rather than treating the end of a programme as the end of development.'],
  ] },
].map(article => ({ ...article, readingTime: Math.max(1, Math.ceil(article.sections.reduce((count, section) => count + section.join(' ').split(/\s+/).length, 0) / 200)) }));

export const growthRequest = (interest, category) => `/request?${new URLSearchParams({ interest, ...(category ? { category } : {}) })}`;
