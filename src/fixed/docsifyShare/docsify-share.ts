function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function themeColor (dsConfig): Promise<void> {
  await delay(300)

  const big_fab = await document.getElementsByClassName('big-fab') as HTMLCollectionOf<HTMLElement>
  const share_button__back = await document.getElementsByClassName('share-button__back') as HTMLCollectionOf<HTMLElement>
  const share_button__front = await document.getElementsByClassName('share-button__front') as HTMLCollectionOf<HTMLElement>

  if (dsConfig.options.theme != undefined) {
    if (dsConfig.options.theme == 'open-window') {
      const change_color = await document.getElementsByClassName('animated') as HTMLCollectionOf<HTMLElement>

      if (change_color.length != 0) {
        for (const item of Array.from(change_color)) {
          item.style.color = await dsConfig.options.color
        }
      }
    } else if (dsConfig.options.theme == 'slide-bar') {
      const change_background = await document.getElementsByClassName('btn-fab') as HTMLCollectionOf<HTMLElement>

      if (change_background.length != 0) {
        for (const item of Array.from(change_background)) {
          item.style.background = await dsConfig.options.color
        }
      }
    } else if (dsConfig.options.theme == 'flip-it') {
      const change_background = await document.getElementsByClassName('btn-fab') as HTMLCollectionOf<HTMLElement>

      if (change_background.length != 0) {
        for (const item of Array.from(change_background)) {
          item.style.background = await dsConfig.options.color
        }
      }
    }
  }

  // theme 'default'
  if (big_fab.length != 0) {
    for (const item of Array.from(big_fab)) {
      item.style.background = await dsConfig.options.color
    }
  }

  // theme 'open-window'
  if (share_button__back.length != 0) {
    for (const item of Array.from(share_button__back)) {
      item.style.background = await dsConfig.options.color
    }
  }
  if (share_button__front.length != 0) {
    for (const item of Array.from(share_button__front)) {
      item.style.background = await dsConfig.options.color
    }
  }
}

function createButton (btnLink, btnClass, btnTltip, iconClass) {
  return [
    '<a href="',
    btnLink,
    '" target="_blank" class="',
    btnClass,
    '" tooltip="',
    btnTltip,
    '"><i class="',
    iconClass,
    '"></i></a>'
  ].join('')
}

export const install = (hook: any, vm: any) => {
  const facebook = vm.config.share.facebook != undefined ? createButton('https://www.facebook.com/sharer.php?u=' + (vm.config.share.facebook.url ?? window.location.href), 'fab indigo', 'Facebook', 'fa fa-facebook animated') : ''
  const reddit = vm.config.share.reddit != undefined ? createButton('https://reddit.com/submit?url=' + (vm.config.share.reddit.url ?? window.location.href) + '&title=' + (vm.config.share.reddit.title ?? document.title), 'fab red', 'Reddit', 'fa fa-reddit animated') : ''
  const twitter = vm.config.share.twitter != undefined ? createButton('https://twitter.com/intent/tweet?url=' + (vm.config.share.twitter.url ?? window.location.href) + '&text=' + (vm.config.share.twitter.title ?? document.title), 'fab light-blue', 'Twitter', 'fa fa-twitter animated') : ''
  const linkedin = vm.config.share.linkedin != undefined ? createButton('https://www.linkedin.com/sharing/share-offsite/?url=' + (vm.config.share.linkedin.url ?? window.location.href), 'fab blue-linkedin', 'Linked In', 'fa fa-linkedin animated') : ''
  const whatsapp = vm.config.share.whatsapp != undefined ? createButton('whatsapp://send?text=' + (vm.config.share.whatsapp.title ?? document.title) + '%20' + (vm.config.share.whatsapp.url ?? window.location.href), 'fab green', 'Whatsapp', 'fa fa-whatsapp animated') : ''
  const telegram = vm.config.share.telegram != undefined ? createButton('https://telegram.me/share/url?url=&' + (vm.config.share.telegram.url ?? window.location.href) + 'text=' + (vm.config.share.telegram.title ?? document.title), 'fab black', 'Telegram', 'fa fa-telegram animated') : ''
  const fontAwesome = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'

  var footer = [
    fontAwesome,
    '<link rel="stylesheet" href="/assets/css/docsify-share.min.css">',
    '<div class="fabs">',
    reddit,
    linkedin,
    facebook,
    twitter,
    whatsapp,
    telegram,
    '<a target="_blank" class="fab light-green big-fab" tooltip="Share"><i class="fa fa-share-alt"></i></a>',
    '</div>'
  ].join('')

  if (vm.config.share.options != undefined) {
    if (vm.config.share.options.theme != undefined) {
      if (vm.config.share.options.theme == 'open-window') {
        var footer = [
          fontAwesome,
          '<link rel="stylesheet" href="/assets/css/docsify-share-open-window.min.css">',
          '<div class="share-button">',
          '<div class="share-button__back">',
          reddit,
          linkedin,
          facebook,
          twitter,
          whatsapp,
          telegram,
          '</div>',
          '<div class="share-button__front">',
          '<p class="share-button__text"><span class="fa fa-share-alt"></span></p>',
          '</div>',
          '</div>'
        ].join('')
      } else if (vm.config.share.options.theme == 'slide-bar') {
        var footer = [
          fontAwesome,
          '<link rel="stylesheet" href="/assets/css/docsify-share-slide-bar.min.css">',
          '<button class="btn-share">',
          reddit,
          linkedin,
          facebook,
          twitter,
          whatsapp,
          telegram,
          '<span class="btn-fab"><span class="fa fa-share-alt"></span></span>',
          '</button>'
        ].join('')
      } else if (vm.config.share.options.theme == 'flip-it') {
        var footer = [
          fontAwesome,
          '<link rel="stylesheet" href="/assets/css/docsify-share-flip-it.min.css">',
          '<div class="fab-container">',
          '<div class="btn-fab"><span class="fa fa-share-alt"></span></div>',
          '<div class="back">',
          reddit,
          linkedin,
          facebook,
          twitter,
          whatsapp,
          telegram,
          '</div>',
          '</div>'
        ].join('')
      }
    }

    if (vm.config.share.options.color != undefined) {
      themeColor(vm.config.share)
    }
  }

  const config = Object.assign(
    {},
    vm.config.share
  )

  hook.afterEach(function (html) {
    return html + footer
  })
}
