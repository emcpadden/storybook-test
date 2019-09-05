import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withNotes } from "@storybook/addon-notes";
import { withA11y } from "@storybook/addon-a11y";
//You may need to import other things from knobs
//like object, number, string etc
import { withKnobs, text } from "@storybook/addon-knobs";
import { withCssResources } from "@storybook/addon-cssresources";
import { withConsole, setConsoleOptions } from '@storybook/addon-console';

// const panelExclude = setConsoleOptions({}).panelExclude;
// setConsoleOptions({
//   panelExclude: [...panelExclude, /deprecated/],
// });
setConsoleOptions({
});

import { CardComponent } from "../app/card/card.component";

import { MatButtonModule } from "@angular/material";

// import  markdown from '../notes/card.notes.md!text';
import markdown from '../notes/card.notes.md';

const note = `
  ## Some markdown  
`;

storiesOf("Card", module)
  .addDecorator(withA11y) //Accessibility
  .addDecorator(withKnobs) //Prop manipulation
  .addDecorator(withCssResources) //CSS selection
  .addParameters({
    cssresources: [
      {
        id: `bluetheme`,
        code: `<style>body { background-color: lightblue; }</style>`,
        picked: false
      }
    ]
  })
  .addDecorator(
    moduleMetadata({
      declarations: [CardComponent],
      imports: [MatButtonModule]
    })
  )
  //.addDecorator((storyFn, context) => setConsoleOptions()(storyFn)(context))
  .add("empty", () => ({
    component: CardComponent,
    props: {}
  }))
  .add("with title", () => ({
    component: CardComponent,
    props: {
      title: "Hello card!"
    }
  }))
  .add("with title and subtitle", () => ({
    component: CardComponent,
    props: {
      title: "Hello card!",
      subtitle: "Well hello there 👋"
    }
  }))
  .add(
    "with notes",
    withNotes("Just a few notes about this story...")(() => ({
      component: CardComponent,
      props: {}
    }),
  ),
  {
    notes: {markdown: markdown},
  })
  .add("with action", () => ({
    component: CardComponent,
    props: {
      title: text("Title", "A card...", "General"),
      subtitle: "Waiting to be clicked-on",
      btnClicked: action("👊 Button was clicked")
    }
  }),
  {
    notes: 'A very simple example of addon notes',
  });

// let's nest a story into our main `Card` stories
storiesOf("Card/nested", module).add("special card", () => ({
  component: CardComponent,
  props: {
    content: "I'm a card in a nested story!"
  }
}));
