// Inside src/config/constants.js

export const CONFIG = {
  girlName: "Shrestha", 
  proposalMessage: "Thank you for accepting the proposal! Waiting for you on the date. ❤️",
  colors: {
    light: { 
      // These keys match the .theme properties in App.jsx
      bgGradient: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', 
      textColor: '#590d22', 
      glassHeart: 'rgba(255, 255, 255, 0.4)', 
      glassBorder: 'rgba(255, 255, 255, 0.9)',
      primaryColor: '#ff4d6d',
      shadowColor: 'rgba(255, 77, 109, 0.2)'
    },
    dark: { 
      bgGradient: 'linear-gradient(135deg, #2d000f 0%, #0f0c29 100%)', 
      textColor: '#ffccd5', 
      glassHeart: 'rgba(60, 10, 30, 0.5)', 
      glassBorder: 'rgba(255, 100, 150, 0.3)',
      primaryColor: '#ff8fa3',
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
};

export const QUESTION_DATA = {
  personal: [
    { id: 1, question: "I want you to be with me in my four days?", hint: "Spring,Summer, Autumn, Winter" },
    { id: 2, question: "Oh No,I mean three days?", hint: "Yesterday, Today, Tomorrow" },
    { id: 3, question: "Oh Sorry, How about two days?", hint: "Day,Night" },
    { id: 4, question: "How about one day?", hint: "Every Day" },
    { id: 5, question: "Will you be the Player 2 to my Player 1?", hint: "Life is a co-op game, not single player." },
    { id: 6, question: "Can I steal your heart?", hint: "I promise to keep it safe." }
  ],
  professional: [
    { id: 1, question: "Are we a Singleton class?", hint: "Because you are the only one instance for me." },
    { id: 2, question: "Can I inject my dependency into your life?", hint: "Spring Boot style: @Autowired Love" },
    { id: 3, question: "Do you accept this Merge Request?", hint: "Merging branch 'MyLife' into 'Yours' with 0 conflicts." },
    { id: 4, question: "Is our connection TCP?", hint: "Because I want to acknowledge every packet of your love." }
  ]
};