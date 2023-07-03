function labelsByName(labels) {
    const byName = {}
    labels.forEach(label => {
      const name = label.getName()
      if (!byName[name]) byName[name] = label
      else Logged.log('Warning the is another label with the same name')
    })
    return byName
}

function FilterByDomain() {
  const labels = labelsByName(GmailApp.getUserLabels());
  const startT = Date.now() + 20000;
  const inc = 5;
  for (let y = 0; y < 3000 && startT > Date.now(); y += inc) {
    console.log('loop', y)
    let threads = GmailApp.getInboxThreads(y, inc);
    for (let i = 0; i < threads.length; i++) {

    const threadsLabels = labelsByName(threads[i].getLabels())
    const messages = threads[i].getMessages();
    const from = messages[0].getFrom().split('@')[1].split('.').slice(0, -1).join('.');

    if (labels[from] && !threadsLabels[from]) threads[i].addLabel(labels[from])
    else if (!labels[from]) {
      const newLabel = GmailApp.createLabel(from);
      threads[i].addLabel(newLabel)
      labels[from] = newLabel
    }
    threads[i].moveToArchive()
   }
  }
  Logger.log('Labels', Object.keys(labels))
}
