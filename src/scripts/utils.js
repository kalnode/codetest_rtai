// ========================================
// GENERIC UTILITY FUNCTIONS
// ========================================

// ----------------------------------------
// DEVICE / CLIENT
// ----------------------------------------

import isMobile from './utils/isMobile'
import isTouch from './utils/isTouch'
import isOnline from './utils/isOnline'

// ----------------------------------------
// DATA MANIPULATION/PASSING
// ----------------------------------------
import copyToClipboard from './utils/copyToClipboard'

// ----------------------------------------
// TIMING
// ----------------------------------------
import exeTime from './utils/exeTime'
import waitFor from './utils/waitFor'
import debounce from './utils/debounce'
import pollReady from './utils/pollReady'

// ----------------------------------------
// SCREEN
// ----------------------------------------
import getScreenWidth from './utils/getScreenWidth'

// ----------------------------------------
// SCROLLING and OVERFLOW
// ----------------------------------------
import doesThisOverflow from './utils/doesThisOverflow'
import getPossibleScrollDirections from './utils/getPossibleScrollDirections'
import scrollByAmount from './utils/scrollByAmount'

// ----------------------------------------
// OBJECT Interactions
// ----------------------------------------
import dotGet from './utils/dotGet'

// ----------------------------------------
// TEXT Labels
// ----------------------------------------
import replaceAll from './utils/replaceAll'

export {
    copyToClipboard,
    exeTime,
    waitFor,
    debounce,
    pollReady,
    isMobile,
    isTouch,
    getScreenWidth,
    doesThisOverflow,
    getPossibleScrollDirections,
    scrollByAmount,
    dotGet,
    replaceAll,
    isOnline
}