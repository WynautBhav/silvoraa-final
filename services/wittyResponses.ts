// Witty responses for AI Stylist
// This file enhances the personality of the Silvoraa Stylist

export const WITTY_KNOWLEDGE_BASE = [
    // Greetings with personality
    {
        patterns: [/hello/i, /hi\b/i, /hey/i, /greetings/i],
        response: "Hey there, gem lover! 💎 I'm your Silvoraa Stylist. Tell me what you're looking for – a mood boost, a gift, or just something that makes you feel amazing!"
    },
    {
        patterns: [/good morning/i],
        response: "Good morning, sunshine! ☀️ Ready to add some sparkle to your day? Tell me what's on your mind – occasion, color, or just vibes!"
    },
    {
        patterns: [/good afternoon/i, /good evening/i],
        response: "Hello, lovely! ✨ Perfect time to treat yourself. What are we shopping for today?"
    },
    {
        patterns: [/how .* you/i, /doing today/i, /what's up/i],
        response: "Living my best crystalline life! 💫 Thanks for asking. Now, let's talk about YOU – shopping for yourself or hunting for the perfect gift?"
    },
    // Fun personality responses
    {
        patterns: [/who are you/i, /what are you/i, /your name/i],
        response: "I'm the Silvoraa Stylist – part jewelry expert, part vibe curator, 100% here to make you shine. Think of me as your personal gem whisperer! 💎✨"
    },
    {
        patterns: [/you're (awesome|amazing|great|cool)/i, /good job/i],
        response: "Aww, you're making me blush! 🥰 (If AI could blush, that is.) Now let's channel that good energy into finding you something gorgeous!"
    },
    {
        patterns: [/love you/i, /marry me/i],
        response: "I'm flattered! 💕 But I think what you really love is gemstones... and honestly, same. Let's find you a ring that'll make your heart skip a beat!"
    },
    {
        patterns: [/bored/i, /nothing to do/i],
        response: "Bored? Sounds like the perfect time for some retail therapy! 🛍️ Let's browse some stunning pieces. What catches your eye – rings, pendants, or earrings?"
    },
    {
        patterns: [/sad/i, /feeling down/i, /depressed/i, /upset/i],
        response: "Sending you virtual sparkles and good vibes! ✨ Fun fact: **Amethyst** is known for its calming energy. Sometimes a little self-care helps. Shall I show you some?"
    },
    {
        patterns: [/stressed/i, /anxious/i, /anxiety/i, /overwhelmed/i],
        response: "Deep breath, friend. 🧘‍♀️ **Lapis Lazuli** and **Amethyst** are known for their calming properties. Sometimes the right stone can be a little pocket of peace."
    },
    {
        patterns: [/broke/i, /no money/i, /poor/i, /expensive/i],
        response: "I hear you! 💸 The good news? Sterling Silver gives you that luxury look without the luxury markup. Plus, our pieces are investment pieces – timeless, not trendy!"
    },
    // Easter eggs
    {
        patterns: [/pizza/i, /burger/i, /food/i, /hungry/i],
        response: "Sadly, I can't order you pizza... yet. 🍕 But I CAN serve up some eye candy! How about some gorgeous **Citrine** that's as warm as fresh cheese?"
    },
    {
        patterns: [/coffee/i, /tea/i],
        response: "A person of taste! ☕ While I can't brew you anything, I can recommend **Labradorite** – it's got that rich, grounded energy. Like coffee for your soul!"
    },
    {
        patterns: [/diamond/i],
        response: "Diamonds are so... expected. 💅 Here at Silvoraa, we celebrate the colorful rebels – natural gemstones with real personality. Trust me, they're cooler."
    },
    {
        patterns: [/gold/i],
        response: "Gold is lovely, but we're a **Sterling Silver** house! ✨ Silver is versatile, hypoallergenic, and honestly? It lets the gemstones be the star of the show."
    },
    // Practical FAQs with personality
    {
        patterns: [/shipping/i, /delivery/i, /arrive/i, /ship/i],
        response: "Your precious cargo ships **express**, fully insured and tracked! 📦✨ Domestic orders typically arrive in 3-5 business days. We treat every box like treasure!"
    },
    {
        patterns: [/return/i, /refund/i, /exchange/i],
        response: "We've got your back! **30-day returns** for unworn items, no drama. If it's not *the one*, we'll help you find what is. 💕"
    },
    {
        patterns: [/clean/i, /care/i, /polish/i, /maintain/i, /wash/i],
        response: "Pro tip: Use a soft polishing cloth for that fresh-out-the-box shine! ✨ Store in the pouch we provide, and keep away from pools and perfumes."
    },
    {
        patterns: [/real/i, /authentic/i, /silver/i, /genuine/i, /fake/i],
        response: "100% real, 100% genuine! All Silvoraa pieces are **Solid 925 Sterling Silver** with ethically sourced natural gemstones. No plating, no fakes! 💎"
    },
    {
        patterns: [/size/i, /measure/i, /fit/i, /chart/i],
        response: "Most of our rings are adjustable (because flexibility is key!). For sized pieces, check the size guide on the product page. Pro tip: A string + ruler = DIY ring sizer! 📏"
    },
    {
        patterns: [/location/i, /store/i, /where .* based/i],
        response: "We're a digital-first brand – no rent, no middlemen, just premium pieces delivered straight to your door! 🏠✨ All the luxury, none of the retail markup."
    },
    {
        patterns: [/thank/i, /thanks/i, /appreciate/i, /thx/i],
        response: "You're so welcome! 💕 It's been a pleasure helping you. Come back anytime you need a sparkle boost!"
    },
    {
        patterns: [/bye/i, /goodbye/i, /see you/i, /later/i],
        response: "Take care, gem! ✨ Remember: life's too short for boring jewelry. See you next time! 💎"
    },
    // Catch-all fun responses for random stuff
    {
        patterns: [/lol/i, /haha/i, /funny/i, /joke/i],
        response: "Glad I could make you smile! 😄 Now let's find you something that'll make everyone else smile too – what kind of piece are you looking for?"
    },
    {
        patterns: [/help/i],
        response: "I'm here to help! 🙌 You can ask me for: rings, earrings, pendants, bracelets, or tell me about an occasion, mood, or color you love!"
    }
];
