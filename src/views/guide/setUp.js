const stepDefinition = {
  element: '#app', // Query selector string or Node to be highlighted
  stageBackground: '#ffffff', // This will override the one set in driver
  popover: { // There will be no popover if empty or not given
    title: 'Title', // Title on the popover
    description: 'Description', // Body of the popover
    showButtons: false, // Do not show control buttons in footer
    doneBtnText: 'Done', // Text on the last button
    closeBtnText: 'Close', // Text on the close button
    nextBtnText: 'Next', // Next button text
    prevBtnText: 'Previous' // Previous button text
  },
  onNext: () => { }, // Called when moving to next step from current step
  onPrevious: () => { } // Called when moving to next step from current step
}
export default stepDefinition
