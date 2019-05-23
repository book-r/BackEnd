exports.seed = function(knex, Promise) {
  return knex('books').del()
    .then(() => knex('books').insert([
      // 1
      {
        title: 'Classical Mechanics',
        isbn: '9781891389221',
        cover_url: 'https://www.uscibooks.com/taycm.jpg',
        publisher_id: 1,
        edition: "1",
        year: 2005,
        featured: true,
        description: "John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text."
      },
      // 2
      {
        title: 'The Great Conversation: A Historical Introduction to Philosophy',
        isbn: '9780195397611',
        cover_url: 'http://covers.openlibrary.org/b/isbn/9780195397611-L.jpg',
        publisher_id: 2,
        edition: "6",
        year: 2010,
        featured: true,
        description: "Now in its sixth edition, this historically organized introductory text treats philosophy as a dramatic and continuous story--a conversation about humankind's deepest and most persistent concerns. Tracing the exchange of ideas among history's key philosophers, The Great Conversation: A Historical Introduction to Philosophy, Sixth Edition, demonstrates that while constructing an argument or making a claim, one philosopher almost always has others in mind. The book addresses the fundamental questions of human life: Who are we? What can we know? How should we live? and What sort of reality do we inhabit?"
      },
      // 3
      {
        title: 'Cognitive Science: An Introduction to the Science of the Mind',
        isbn: '9780521882002',
        cover_url: 'http://covers.openlibrary.org/b/isbn/9780521882002-L.jpg',
        publisher_id: 2,
        edition: "0",
        year: 2010,
        featured: false,
        description: "Cognitive science is at last treated as a unified subject in this exciting textbook. Students are introduced to the techniques and main theoretical models of the cognitive scientist's toolkit, and shown how this vibrant science is applied to unlock the mysteries of the human mind."
      },
      // 4
      {
        title: 'Introduction to Statistical Inference',
        isbn: '9780387964201',
        cover_url: 'http://covers.openlibrary.org/b/isbn/9780387964201-L.jpg',
        publisher_id: 3,
        edition: "0",
        year: 1987,
        featured: true,
        description: "This book is based upon lecture notes developed by Jack Kiefer for a course in statistical inference he taught at Cornell University. The notes were distributed to the class in lieu of a textbook, and the problems were used for homework assignments. Relying only on modest prerequisites of probability theory and calculus, Kiefer's approach to a first course in statistics is to present the central ideas of the modem mathematical theory with a minimum of fuss and formality. He is able to do this by using a rich mixture of examples, pictures, and math­ ematical derivations to complement a clear and logical discussion of the important ideas in plain English. The straightforwardness of Kiefer's presentation is remarkable in view of the sophistication and depth of his examination of the major theme: How should an intelligent person formulate a statistical problem and choose a statistical procedure to apply to it? Kiefer's view, in the same spirit as Neyman and Wald, is that one should try to assess the consequences of a statistical choice in some quantitative (frequentist) formulation and ought to choose a course of action that is verifiably optimal (or nearly so) without regard to the perceived attractiveness of certain dogmas and methods."
      },
      //5
      {
        title: 'Introduction to Electrodynamics',
        isbn: '9781108420419',
        cover_url: 'https://www.pearsonhighered.com/assets/bigcovers/0/3/2/1/0321856562.jpg',
        publisher_id: 2,
        edition: "4",
        year: 2017,
        featured: false,
        description: "This well-known undergraduate electrodynamics textbook is now available in a more affordable printing from Cambridge University Press. The Fourth Edition provides a rigorous, yet clear and accessible treatment of the fundamentals of electromagnetic theory and offers a sound platform for explorations of related applications (AC circuits, antennas, transmission lines, plasmas, optics and more). Written keeping in mind the conceptual hurdles typically faced by undergraduate students, this textbook illustrates the theoretical steps with well-chosen examples and careful illustrations. It balances text and equations, allowing the physics to shine through without compromising the rigour of the math, and includes numerous problems, varying from straightforward to elaborate, so that students can be assigned some problems to build their confidence and others to stretch their minds. A Solutions Manual is available to instructors teaching from the book; access can be requested from the resources section at www.cambridge.org/electrodynamics."
      },
      // 6
      {
        title: 'Introduction to Quantum Mechanics',
        isbn: '9781107179868',
        cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51zU2Qe%2B5cL._SX358_BO1,204,203,200_.jpg',
        publisher_id: 2,
        edition: "2",
        year: 2016,
        featured: true,
        description: "This bestselling undergraduate quantum mechanics textbook is now available in a re-issued, affordable edition from Cambridge University Press. The text first teaches students how to do quantum mechanics, and then provides them with a more insightful discussion of what it means. The author avoids the temptation to include every possible relevant topic, instead presenting students with material that they can easily focus on in a complete treatment with few distractions and diversions. Fundamental principles are covered, quantum theory is presented, and special techniques are developed for attacking realistic problems. The innovative two-part coverage is entertaining and informative, organizing topics under basic theory and assembling an arsenal of approximation schemes with illustrative applications linked closely to the text."
      },
    ]));
};
