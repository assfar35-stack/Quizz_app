const quizData = {
  "HTML": [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Preprocessor",
        "Hyper Text Markup Language",
        "Hyper Text Multiple Language",
        "Hyper Tool Multi Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which HTML5 element is used for specifying the main content of a document?",
      options: [
        "<header>",
        "<main>",
        "<content>",
        "<body>"
      ],
      answer: "<main>"
    },
    {
      question: "What is the correct way to create a line break in HTML?",
      options: [
        "<break>",
        "<lb>",
        "<br>",
        "<newline>"
      ],
      answer: "<br>"
    },
    {
      question: "Which HTML element is used for creating a table?",
      options: [
        "<tab>",
        "<table>",
        "<grid>",
        "<array>"
      ],
      answer: "<table>"
    },
    {
      question: "What is the purpose of the <meta> tag?",
      options: [
        "To define metadata about the HTML document",
        "To create a navigation menu",
        "To insert images",
        "To define page links"
      ],
      answer: "To define metadata about the HTML document"
    },
    {
      question: "Which attribute is used to specify that an input field is required?",
      options: [
        "validate",
        "important",
        "required",
        "mandatory"
      ],
      answer: "required"
    },
    {
      question: "What does the <article> tag represent in HTML5?",
      options: [
        "A section of a page that could stand alone and be distributed independently",
        "A navigation menu",
        "A sidebar widget",
        "A footer section"
      ],
      answer: "A section of a page that could stand alone and be distributed independently"
    },
    {
      question: "Which HTML5 element represents a self-contained piece of content with optional heading?",
      options: [
        "<div>",
        "<section>",
        "<figure>",
        "<block>"
      ],
      answer: "<figure>"
    },
    {
      question: "What is the correct HTML5 DOCTYPE declaration?",
      options: [
        "<!DOCTYPE HTML PUBLIC>",
        "<!DOCTYPE html>",
        "<!DOCTYPE HTML 5>",
        "<!DOCTYPE html5>"
      ],
      answer: "<!DOCTYPE html>"
    },
    {
      question: "Which element is used to define a description list in HTML?",
      options: [
        "<ul>",
        "<ol>",
        "<dl>",
        "<li>"
      ],
      answer: "<dl>"
    }
  ],
  "CSS": [
    {
      question: "What does CSS stand for?",
      options: [
        "Colorful Style Sheets",
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style Sheets"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which CSS property is used to change the background color of an element?",
      options: [
        "bgcolor",
        "background-color",
        "color-background",
        "bg-color"
      ],
      answer: "background-color"
    },
    {
      question: "What is the correct way to select an element with the id 'header'?",
      options: [
        ".header",
        "#header",
        "header",
        "*header"
      ],
      answer: "#header"
    },
    {
      question: "Which CSS display property is used to hide an element but still take up space?",
      options: [
        "display: none;",
        "visibility: hidden;",
        "display: hidden;",
        "opacity: 0;"
      ],
      answer: "visibility: hidden;"
    },
    {
      question: "What does the 'z-index' property control in CSS?",
      options: [
        "The width of an element",
        "The stacking order of positioned elements",
        "The zoom level of the page",
        "The z-axis rotation"
      ],
      answer: "The stacking order of positioned elements"
    },
    {
      question: "Which CSS property is used to add space inside an element?",
      options: [
        "margin",
        "padding",
        "spacing",
        "gap"
      ],
      answer: "padding"
    },
    {
      question: "What is the default value of the position property?",
      options: [
        "absolute",
        "relative",
        "static",
        "fixed"
      ],
      answer: "static"
    },
    {
      question: "Which CSS property controls the transparency of an element?",
      options: [
        "transparency",
        "opacity",
        "alpha",
        "fade"
      ],
      answer: "opacity"
    },
    {
      question: "What does the CSS 'flex' property do?",
      options: [
        "Creates a flexible grid layout",
        "Makes elements flexible in flexbox containers",
        "Adds flexibility to animations",
        "Adjusts font size"
      ],
      answer: "Makes elements flexible in flexbox containers"
    },
    {
      question: "Which CSS property is used to set the space between grid items?",
      options: [
        "gap",
        "spacing",
        "margin",
        "padding"
      ],
      answer: "gap"
    }
  ],
  "Javascript": [
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["//", "", "/* */", "#"],
      answer: "//"
    },
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var x = 5;",
        "variable x = 5;",
        "v x = 5;",
        "x := 5;"
      ],
      answer: "var x = 5;"
    },
    {
      question: "Which built-in method returns the character at a specified index in a string?",
      options: [
        "charAt()",
        "charAt()",
        "getChar()",
        "index()"
      ],
      answer: "charAt()"
    },
    {
      question: "What does the 'typeof' operator return for an array?",
      options: [
        "array",
        "object",
        "list",
        "collection"
      ],
      answer: "object"
    },
    {
      question: "Which method adds one or more elements to the end of an array?",
      options: [
        "push()",
        "add()",
        "append()",
        "insert()"
      ],
      answer: "push()"
    },
    {
      question: "What is the correct way to check if a variable is an array?",
      options: [
        "typeof variable === 'array'",
        "variable instanceof Array",
        "isArray(variable)",
        "Array.isArray(variable)"
      ],
      answer: "Array.isArray(variable)"
    },
    {
      question: "Which method is used to convert a string to uppercase in JavaScript?",
      options: [
        "toUppercase()",
        "toUpperCase()",
        "uppercase()",
        "UPPERCASE()"
      ],
      answer: "toUpperCase()"
    },
    {
      question: "What does the 'setTimeout()' function do?",
      options: [
        "Sets a maximum execution time for a script",
        "Executes a function after a specified delay",
        "Sets the time zone",
        "Pauses script execution"
      ],
      answer: "Executes a function after a specified delay"
    },
    {
      question: "How do you create an object in JavaScript?",
      options: [
        "object obj = {};",
        "var obj = {};",
        "new Object {};",
        "obj = new Array();"
      ],
      answer: "var obj = {};"
    },
    {
      question: "Which method removes the last element from an array?",
      options: [
        "pop()",
        "push()",
        "shift()",
        "unshift()"
      ],
      answer: "pop()"
    }
  ],
  "Accessibility": [
    {
      question: "Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?",
      options: ["4.5 : 1", "3 : 1", "2.5 : 1", "5 : 1"],
      answer: "4.5 : 1"
    },
    {
      question: "What does WCAG stand for?",
      options: [
        "Web Content Accessibility Guidelines",
        "Web Color and Graphics Guidelines",
        "Website Coding and General Guidelines",
        "Web Compliance and Global Standards"
      ],
      answer: "Web Content Accessibility Guidelines"
    },
    {
      question: "Which HTML element is essential for accessibility in forms?",
      options: [
        "<placeholder>",
        "<label>",
        "<title>",
        "<description>"
      ],
      answer: "<label>"
    },
    {
      question: "What is the purpose of the 'alt' attribute in images?",
      options: [
        "To change the image size",
        "To provide alternative text for screen readers",
        "To add a tooltip on hover",
        "To improve image quality"
      ],
      answer: "To provide alternative text for screen readers"
    },
    {
      question: "Which ARIA attribute is used to describe the purpose of an element?",
      options: [
        "aria-label",
        "aria-describe",
        "aria-purpose",
        "aria-role"
      ],
      answer: "aria-label"
    },
    {
      question: "What is keyboard accessibility?",
      options: [
        "Using a special keyboard for typing",
        "The ability to navigate and use a website using only a keyboard",
        "A feature that types faster",
        "A keyboard shortcut feature"
      ],
      answer: "The ability to navigate and use a website using only a keyboard"
    },
    {
      question: "Which semantic HTML element represents a footer section?",
      options: [
        "<bottom>",
        "<footer>",
        "<foot>",
        "<endsection>"
      ],
      answer: "<footer>"
    },
    {
      question: "What does the 'role' attribute do in ARIA?",
      options: [
        "Defines the purpose or type of an element",
        "Changes the styling of an element",
        "Adds animation to an element",
        "Sets the position of an element"
      ],
      answer: "Defines the purpose or type of an element"
    },
    {
      question: "Which color combination would have better contrast for accessibility?",
      options: [
        "Light gray text on white background",
        "Dark text on light background",
        "Bright neon colors",
        "Light colors on light background"
      ],
      answer: "Dark text on light background"
    },
    {
      question: "What should every page have for accessibility purposes?",
      options: [
        "Animations",
        "Multiple fonts",
        "A descriptive page title",
        "Auto-playing music"
      ],
      answer: "A descriptive page title"
    }
  ]
};