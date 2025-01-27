// types.ts
export interface HeroData {
    about_hero_heading: string;
    about_hero_description: string;
    about_hero_image: {
      url: string;
      alternativeText?: string;
    };
    about_hero_cta: {
      name: string;
      url: string;
    };
  }

  export interface HeroDataAcademy {
    heading: string;
    description: string;
    image: {
      url: string;
      alternativeText?: string;
    };
    cta: {
      name: string;
      url: string;
    };
  }
  
  export interface SolvesData {
    analytics_solves_heading: string;
    analytics_solves_list: {
      id: string;
      heading: string;
      description: string;
    }[];
  }
  
  export interface ServicesData {
    about_feature_heading: string;
    about_feature_description: string;
    about_featureList: {
      id: string;
      heading: string;
      description: string;
    }[];
  }
  
  export interface ChooseData {
    chatbot_guide_heading: string;
    chatbot_guide_description: string;
    ai_assistance_guide: {
      id: string;
      guide_steps_no: string;
      guide_steps_heading: string;
      guide_steps_description: string;
    }[];
  }
  
  export interface IndustriesData {
    about_feature_heading: string;
    about_feature_description: string;
    about_featureList: {
      id: string;
      heading: string;
      description: string;
      image: string;
    }[];
  }
  
  export interface DataAnalyticsData {
    dataAnalytics_hero: HeroData;
    dataAnalytics_solves: SolvesData;
    dataAnalytics_services: ServicesData;
    dataAnalytics_choose: ChooseData;
    dataAnalytics_industries: IndustriesData;
  }

 /*  export interface HeroData {
  heading?: string;
  description?: string;
  icon?: {
    url: string;
  };
} */

/* export interface Feature {
  heading?: string;
  description?: string;
} */

/* export interface CareerGrowthData {
  heading?: string;
  description?: string;
  cards?: Card[];
}
 */
export interface Card {
  academy_heading?: string;
  academy_description?: string;
  academy_image?: {
    url: string;
  };
  academy_featureList?: string[];
}

export interface TopCoursesData {
  about_feature_heading?: string;
  about_feature_description?: string;
  about_featureList?: Course[];
}

export interface Course {
  heading?: string;
  description?: string;
  icon?: {
    url: string;
  };
}

/* export interface WhyChooseData {
  about_feature_heading?: string;
  about_feature_description?: string;
  about_featureList?: Feature[];
}
 */

export interface FeatureType {
  icon: {
    url: string;
    alternativeText?: string;
  };
  heading: string;
  description: string;
}

export interface FeaturesSectionType {
  about_feature_heading: string;
  about_feature_description: string;
  about_featureList: FeatureType[];
}

export interface CtaSectionType {
  about_cta_heading: string;
  about_cta_description: string;
  about_cta_emailPlaceholder: string;
  about_cta_emailButton: {
    name: string;
  };
}

export interface AboutData {
  About: [
    HeroData,
    FeaturesSectionType,
    CtaSectionType
  ];
}

export interface ContactElement {
  id: number;
  icon: {
    url: string;
    alternativeText?: string;
  };
  heading: string;
  description: string;
}

export interface ContactData {
  contact_page_heading: string;
  contact_page_description: string;
  contactElement: ContactElement[];
  contact_form_heading: string;
  contact_form_description: string;
  first_name_label: string;
  email_label: string;
  phone_label: string;
  message_label: string;
  submit_button_label: string;
  first_name_placeholder: string;
  email_placeholder: string;
  phone_placeholder: string;
  message_placeholder: string;
}

export interface FormData {
  first_name: string;
  email: string;
  phone: string;
  message: string;
}


export interface HeroDataAcademy {
  heading: string;
  description: string;
  icon: {
    url: string;
    alternativeText?: string;
  };
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: {
    url: string;
    alternativeText?: string;
  };
}

export interface CareerGrowthData {
  title: string;
  description: string;
  cards: {
    id: number;
    title: string;
    description: string;
    academy_image: {
      url: string;
      alternativeText?: string;
    };
  }[];
}

export interface TopCoursesData {
  title: string;
  description: string;
  courses: {
    id: number;
    title: string;
    description: string;
    icon: {
      url: string;
      alternativeText?: string;
    };
  }[];
}

export interface WhyChooseData {
  title: string;
  description: string;
  about_featureList: {
    id: number;
    title: string;
    description: string;
    icon: {
      url: string;
      alternativeText?: string;
    };
  }[];
}


export interface AIData {
  __component: string;
  about_hero_cta?: string;
  about_hero_image?: {
    url?: string;
  };
  about_hero_description?: string;
  about_hero_heading?: string;
  chatbot_guide_heading?: string;
  chatbot_guide_description?: string;
  ai_assistance_guide?: Array<{
    guide_steps_no?: string;
    guide_steps_heading?: string;
    guide_steps_description?: string;
  }>;
  ai_assistance_services_heading?: string;
  ai_assistance_services_description?: string;
  ai_assistance_services_card?: Array<{
    heading?: string;
    description?: string;
  }>;
  icon?: {
    url?: string;
    alternativeText?: string;
  };
}