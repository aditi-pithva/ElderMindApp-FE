export const QUESTIONS = [
  {
    section: "Demographics",
    questions: [
      { id: "NACCAGE", text: "What is your age?", type: "number" },
      { id: "SEX", text: "What is your gender?", type: "dropdown", options: ["Male", "Female"] },
      { id: "PRIMLANG", text: "What is your primary language?", type: "dropdown", options: ["English", "Spanish", "Mandarin", "Cantonese", "Russian", "Japanese", "Other"] },
      { id: "RACE", text: "What is your race?", type: "dropdown", options: ["White", "Black or African American", "American Indian or Alaska Native", "Native Hawaiian or Other Pacific Islander", "Asian", "Other"] },
      { id: "EDUC", text: "How many years of education do you have (0-31)?", type: "number" }
    ]
  },
  {
    section: "Medical",
    questions: [
      { id: "SMOKS", text: "Are you a smoker?", type: "dropdown", options: ["No Smoker", "Current Smoker", "Former Smoker"] },
      { id: "ALCCAT", text: "Do you drink alcohol?", type: "dropdown", options: ["No Alcohol Consumption", "Light drinker", "Heavy drinker"] },
      { id: "HEARF", text: "Is your hearing functioning properly?", type: "dropdown", options: ["Hearing functioning correctly (with or without hearing aids)", "Hearing not functioning correctly, uses hearing aid(s)", "Hearing not functioning correctly, does not use hearing aid"] },
      { id: "VISIONF", text: "Is your vision functioning properly?", type: "dropdown", options: ["Eyes functioning correctly (with or without glasses)", "Eyes not functioning correctly and wears glasses", "Eyes not functioning correctly and does not wear glasses"] },
      { id: "BPSYS", text: "What is your systolic blood pressure? (Systolic : 60-232)", type: "number" },
      { id: "BPDIAS", text: "What is your diastolic blood pressure? (Diastolic : 30-140)", type: "number" },
      { id: "HRATE", text: "What is your heart rate (33-138)?", type: "number" },
      { id: "NACCBMI", text: "What is your BMI (9.9-64.9)?", type: "number" },
      { id: "CVHATT", text: "Have you had a heart attack?", type: "yesno", options: ["No", "Yes"] },
      { id: "CONGHRT", text: "Do you have congestive heart failure?", type: "yesno", options: ["No", "Yes"] },
      { id: "AFIBRILL", text: "Do you have atrial fibrillation?", type: "yesno", options: ["No", "Yes"] },
      { id: "HYPERT", text: "Do you have hypertension?", type: "yesno", options: ["No", "Yes"] },
      { id: "ANGINA", text: "Do you have angina?", type: "yesno", options: ["No", "Yes"] },
      { id: "PACEMAKE", text: "Do you have a pacemaker and/or defibrillator?", type: "yesno", options: ["No", "Yes"] },
      { id: "HVALVE", text: "Have you had heart valve replacement or repair?", type: "yesno", options: ["No", "Yes"] },
      { id: "STROKE", text: "Have you had a stroke or mini-stroke?", type: "yesno", options: ["No", "Yes"] },
      { id: "PTSDDX", text: "Do you have post-traumatic stress disorder (PTSD)?", type: "yesno", options: ["No", "Yes"] },
      { id: "THYDIS", text: "Do you have thyroid disease?", type: "yesno", options: ["No", "Yes"] },
      { id: "VB12DEF", text: "Do you have vitamin B12 deficiency?", type: "yesno", options: ["No", "Yes"] },
      { id: "HYPOSOM", text: "Do you have hyposomnia (insomnia)?", type: "yesno", options: ["No", "Yes"] },
      { id: "OCD", text: "Do you have obsessive-compulsive disorder (OCD)?", type: "yesno", options: ["Absent", "Present"] },
      { id: "NPSYDEV", text: "Do you have developmental neuropsychiatric disorders like ASD, ADHD, or dyslexia?", type: "yesno", options: ["Absent", "Present"] },
      { id: "CVBYPASS", text: "Have you had a cardiac bypass procedure?", type: "yesno", options: ["Absent", "Present"] }
    ]
  },
  {
    section: "Cognitive Function",
    questions: [
      { id: "COGMEM", text: "Do you usually forget conversations or misplace things more than usual?", type: "yesno", options: ["No", "Yes"] },
      { id: "COGORI", text: "Do you ever feel confused about the current day or month, or find yourself getting lost in places that used to be familiar?", type: "yesno", options: ["No", "Yes"] },
      { id: "COGJUDG", text: "Have you had any difficulty managing tasks like paying bills, cooking meals, shopping, or remembering how to use common household items?", type: "yesno", options: ["No", "Yes"] },
      { id: "COGLANG", text: "Do you notice hesitations in your speech, trouble finding the right words, or using incorrect words without realizing it?", type: "yesno", options: ["No", "Yes"] },
      { id: "COGVIS", text: "Do you struggle with understanding what you see or navigating spaces, even ones you know well?", type: "yesno", options: ["No", "Yes"] },
      { id: "COGATTN", text: "Do you find it hard to focus on tasks or feel that you're easily distracted?", type: "yesno", options: ["No", "Yes"] },
      { id: "COGFLUC_CAT", text: "Do you experience periods where your alertness or ability to focus seems to vary significantly?", type: "dropdown", options: [
        "No Fluctuating Cognition", 
        "Fluctuating Cognition begin: Very Early (≤30)", 
        "Fluctuating Cognition begin: Early (31–45)", 
        "Fluctuating Cognition begin: Mid-age (46–60)", 
        "Fluctuating Cognition begin: Late (61–75)", 
        "Fluctuating Cognition begin: Very Late (>75)"
      ]}
    ]
  },
  {
    section: "Behavioral & Psychological Symptoms",
    questions: [
      { id: "BEAPATHY", text: "Have you lost interest in your usual activities or found it harder to start conversations or interact with family or friends?", type: "yesno", options: ["No", "Yes"] },
      { id: "BEDEP", text: "Have you felt sad, hopeless, or lost interest in nearly everything for more than two weeks at a time?", type: "yesno", options: ["No", "Yes"] },
      { id: "HALLUCINATION", text: "Have you experienced hallucinations (seeing things that aren't really there or hearing voices that others couldn't hear)?", type: "yesno", options: ["No", "Yes"] },
      { id: "BEDISIN", text: "Have you found yourself saying or doing things in public that others might consider inappropriate, like using strong language or neglecting personal hygiene?", type: "yesno", options: ["No", "Yes"] },
      { id: "BEIRRIT", text: "Do you find yourself getting upset easily or reacting strongly by yelling at family members or others around you?", type: "yesno", options: ["No", "Yes"] },
      { id: "BEAGIT", text: "Have you felt restless or found it hard to sit still, or have you had moments of shouting, hitting, or kicking?", type: "yesno", options: ["No", "Yes"] },
      { id: "BEPERCH", text: "Have you noticed changes in your personality, like collecting unusual items, dressing differently, acting suspicious, or not considering others' feelings?", type: "yesno", options: ["No", "Yes"] },
      { id: "RBD_CAT", text: "Do you ever act out your dreams while sleeping — like punching, shouting, or flailing your arms?", type: "dropdown", options: [
        "No REM Sleep Disorder", 
        "REM Sleep Disorder begin: Very Early (≤30)", 
        "REM Sleep Disorder begin: Early (31–45)", 
        "REM Sleep Disorder begin: Mid-age (46–60)", 
        "REM Sleep Disorder begin: Late (61–75)", 
        "REM Sleep Disorder begin: Very Late (>75)"
      ]},
      { id: "ANXIET", text: "Do you often feel nervous or find yourself worrying a lot, or show signs like sighing frequently or wringing your hands?", type: "yesno", options: ["No", "Yes"] }
    ]
  },
  {
    section: "Motor and Movement Symptoms",
    questions: [
      { id: "MOGAIT", text: "Have you noticed any changes in how you walk, like feeling unsteady, dragging a foot, shuffling, or swinging your arms less — not related to arthritis or an injury?", type: "yesno", options: ["No", "Yes"] },
      { id: "MOFALLS", text: "Have you been falling more often than you used to, without a clear cause like tripping or slipping?", type: "yesno", options: ["No", "Yes"] },
      { id: "MOTREM", text: "Have you experienced shaking or tremors in your hands, arms, legs, head, or even your mouth or tongue — especially when you're resting?", type: "yesno", options: ["No", "Yes"] },
      { id: "MOSLOW", text: "Do you feel like you've been moving, walking, or writing more slowly than usual, or has your facial expression become less animated or more blank?", type: "yesno", options: ["No", "Yes"] }
    ]
  },
  {
    section: "Family History",
    questions: [
      { id: "NACCFAM", text: "Has anyone in your immediate family been diagnosed with Cognitive Impairment?", type: "yesno", options: ["No", "Yes"] },
      { id: "NACCADMU", text: "Has anyone in your family been diagnosed with AD due to a known genetic mutation?", type: "yesno", options: ["No", "Yes"] },
      { id: "NACCFTDM", text: "Have you been told that you have a genetic condition related to frontotemporal dementia (FTLD) in your family?", type: "yesno", options: ["No", "Yes"] }
    ]
  }
];