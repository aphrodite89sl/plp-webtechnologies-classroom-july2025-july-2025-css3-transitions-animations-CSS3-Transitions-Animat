/* =============================================
   JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES
   Part 2: Functional Logic Demonstrating Scope Awareness
   Part 3: Combining CSS Animations with JavaScript
============================================= */

// ===== GLOBAL SCOPE VARIABLES =====
// These variables are accessible throughout the entire script
const globalAnimationState = {
    isAnimating: false,
    activeAnimations: 0,
    maxAnimations: 5
};

let globalCounter = 0;
const ANIMATION_TYPES = ['pulse', 'bounce', 'rotate', 'shake', 'flip'];

// ===== UTILITY FUNCTIONS =====

/**
 * Generates a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random hex color
 * @returns {string} Random hex color code
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Formats a message with timestamp for display
 * @param {string} message - The message to format
 * @param {string} type - Type of message (info, success, error, warning)
 * @returns {string} Formatted message with timestamp
 */
function formatMessage(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const typeIcons = {
        info: 'ℹ️',
        success: '✅',
        error: '❌',
        warning: '⚠️'
    };
    return `${typeIcons[type] || 'ℹ️'} [${timestamp}] ${message}`;
}

// ===== PART 2: JAVASCRIPT FUNCTIONS DEMONSTRATING SCOPE =====

/**
 * Calculates the area of a rectangle
 * Demonstrates parameters and return values
 * @param {number} width - Width of the rectangle
 * @param {number} height - Height of the rectangle
 * @returns {number} Area of the rectangle
 */
function calculateRectangleArea(width, height) {
    // Local variables - only accessible within this function
    const area = width * height;
    return area;
}

/**
 * Creates a personalized greeting message
 * Demonstrates default parameters and string manipulation
 * @param {string} name - Person's name
 * @param {string} timeOfDay - Time of day (morning, afternoon, evening)
 * @param {string} mood - Person's mood
 * @returns {string} Personalized greeting
 */
function createGreeting(name = 'Guest', timeOfDay = 'day', mood = 'great') {
    // Local scope variables
    const greetings = {
        morning: 'Good morning',
        afternoon: 'Good afternoon', 
        evening: 'Good evening',
        day: 'Hello'
    };
    
    const baseGreeting = greetings[timeOfDay] || greetings.day;
    return `${baseGreeting}, ${name}! I hope you're having a ${mood} ${timeOfDay}.`;
}

/**
 * Updates and returns a counter value
 * Demonstrates closure and modifying global state
 * @param {number} increment - Amount to increment by
 * @returns {number} New counter value
 */
function updateCounter(increment = 1) {
    // This function modifies the global variable
    globalCounter += increment;
    return globalCounter;
}

/**
 * Creates a counter with private state using closure
 * Demonstrates encapsulation and private variables
 * @returns {Object} Counter object with methods
 */
function createPrivateCounter() {
    // Private variable - only accessible through returned methods
    let privateCount = 0;
    
    return {
        increment: function(amount = 1) {
            privateCount += amount;
            return privateCount;
        },
        decrement: function(amount = 1) {
            privateCount -= amount;
            return privateCount;
        },
        getValue: function() {
            return privateCount;
        },
        reset: function() {
            privateCount = 0;
            return privateCount;
        }
    };
}

/**
 * Validates user input and returns processed data
 * Demonstrates error handling and multiple return scenarios
 * @param {string} input - User input string
 * @param {number} maxLength - Maximum allowed length
 * @returns {Object} Validation result with data or error
 */
function validateAndProcessInput(input, maxLength = 50) {
    // Input validation with early returns
    if (!input || input.trim() === '') {
        return { 
            success: false, 
            error: 'Input cannot be empty',
            data: null 
        };
    }
    
    if (input.length > maxLength) {
        return { 
            success: false, 
            error: `Input exceeds maximum length of ${maxLength} characters`,
            data: null 
        };
    }
    
    // Process valid input
    const processedData = {
        original: input,
        trimmed: input.trim(),
        length: input.length,
        uppercase: input.toUpperCase(),
        lowercase: input.toLowerCase(),
        words: input.trim().split(/\s+/).length
    };
    
    return {
        success: true,
        error: null,
        data: processedData
    };
}

// ===== PART 3: ANIMATION CONTROL FUNCTIONS =====

/**
 * Toggles CSS animation class on an element
 * Demonstrates DOM manipulation and class management
 * @param {string} elementId - ID of the element to animate
 * @param {string} className - CSS class to toggle
 * @returns {boolean} New animation state (true if added, false if removed)
 */
function toggleAnimation(elementId, className) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID '${elementId}' not found`);
        return false;
    }
    
    const hasClass = element.classList.contains(className);
    
    if (hasClass) {
        element.classList.remove(className);
        globalAnimationState.activeAnimations--;
    } else {
        element.classList.add(className);
        globalAnimationState.activeAnimations++;
    }
    
    globalAnimationState.isAnimating = globalAnimationState.activeAnimations > 0;
    return !hasClass;
}

/**
 * Applies a random animation to an element
 * Demonstrates array manipulation and random selection
 * @param {string} elementId - ID of the element to animate
 * @returns {string} Name of the applied animation
 */
function applyRandomAnimation(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID '${elementId}' not found`);
        return null;
    }
    
    // Remove any existing animation classes
    ANIMATION_TYPES.forEach(animation => {
        element.classList.remove(`${animation}-animation`);
    });
    
    // Select and apply random animation
    const randomIndex = getRandomNumber(0, ANIMATION_TYPES.length - 1);
    const selectedAnimation = ANIMATION_TYPES[randomIndex];
    
    element.classList.add(`${selectedAnimation}-animation`);
    return selectedAnimation;
}

/**
 * Changes element color with smooth transition
 * Demonstrates style manipulation and CSS property setting
 * @param {string} elementId - ID of the element
 * @param {string} color - CSS color value
 * @param {number} duration - Transition duration in milliseconds
 * @returns {Promise} Promise that resolves when transition completes
 */
function changeColorWithTransition(elementId, color, duration = 500) {
    return new Promise((resolve) => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID '${elementId}' not found`);
            resolve(false);
            return;
        }
        
        // Set transition properties
        element.style.transition = `background-color ${duration}ms ease`;
        
        // Change color
        element.style.backgroundColor = color;
        
        // Resolve promise when transition completes
        setTimeout(() => {
            resolve(true);
        }, duration);
    });
}

/**
 * Creates a sequential animation sequence
 * Demonstrates async/await and animation sequencing
 * @param {string} elementId - ID of the element to animate
 * @param {Array} animations - Array of animation classes to apply sequentially
 * @param {number} delay - Delay between animations in milliseconds
 */
async function runAnimationSequence(elementId, animations, delay = 1000) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID '${elementId}' not found`);
        return;
    }
    
    // Clear any existing animations
    ANIMATION_TYPES.forEach(animation => {
        element.classList.remove(`${animation}-animation`);
    });
    
    for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];
        
        // Apply animation
        element.classList.add(`${animation}-animation`);
        
        // Display progress
        displayResult(`Animation ${i + 1}/${animations.length}: ${animation}`, 'animationResults');
        
        // Wait for delay before next animation
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Remove current animation
        element.classList.remove(`${animation}-animation`);
    }
    
    displayResult('Animation sequence completed!', 'animationResults', 'success');
}

/**
 * Controls modal display with animation
 * Demonstrates complex DOM manipulation and CSS class management
 * @param {string} modalId - ID of the modal element
 * @param {boolean} show - Whether to show or hide the modal
 * @param {number} animationDuration - Duration of animation in milliseconds
 */
function toggleModal(modalId, show, animationDuration = 500) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal with ID '${modalId}' not found`);
        return;
    }
    
    if (show) {
        modal.classList.add('active');
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Reset modal content position after animation
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(-50px) scale(0.9)';
                modalContent.style.opacity = '0';
            }
        }, animationDuration);
    }
}

/**
 * Manages loading state with animation
 * Demonstrates state management and visual feedback
 * @param {string} containerId - ID of the loading container
 * @param {boolean} show - Whether to show or hide loader
 * @param {string} message - Loading message to display
 */
function toggleLoader(containerId, show, message = 'Loading...') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
    }
    
    const loadingText = container.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = message;
    }
    
    container.style.display = show ? 'block' : 'none';
}

// ===== RESULT DISPLAY FUNCTIONS =====

/**
 * Displays results in a specified element
 * Demonstrates DOM manipulation and string formatting
 * @param {string} message - Message to display
 * @param {string} elementId - ID of the results container
 * @param {string} type - Type of message (info, success, error, warning)
 */
function displayResult(message, elementId = 'functionResults', type = 'info') {
    const resultElement = document.getElementById(elementId);
    if (!resultElement) {
        console.error(`Results element with ID '${elementId}' not found`);
        return;
    }
    
    const formattedMessage = formatMessage(message, type);
    const messageElement = document.createElement('div');
    messageElement.className = `result-message ${type}`;
    messageElement.innerHTML = formattedMessage;
    messageElement.style.padding = '0.5rem';
    messageElement.style.borderLeft = `4px solid ${
        type === 'success' ? '#2ecc71' : 
        type === 'error' ? '#e74c3c' : 
        type === 'warning' ? '#f39c12' : '#3498db'
    }`;
    messageElement.style.marginBottom = '0.5rem';
    messageElement.style.background = 'rgba(255, 255, 255, 0.1)';
    messageElement.style.borderRadius = '4px';
    
    resultElement.appendChild(messageElement);
    resultElement.scrollTop = resultElement.scrollHeight;
    
    // Auto-remove old messages if there are too many
    const messages = resultElement.querySelectorAll('.result-message');
    if (messages.length > 10) {
        messages[0].remove();
    }
}

/**
 * Clears all results from a specified element
 * @param {string} elementId - ID of the results container
 */
function clearResults(elementId = 'functionResults') {
    const resultElement = document.getElementById(elementId);
    if (resultElement) {
        resultElement.innerHTML = '';
    }
}

// ===== INITIALIZATION AND EVENT HANDLERS =====

/**
 * Initializes all event listeners and demo functionality
 * Demonstrates modular setup and event delegation
 */
function initializeDemo() {
    // Part 2: Function Demonstrations
    document.getElementById('calculateBtn')?.addEventListener('click', function() {
        const width = getRandomNumber(5, 20);
        const height = getRandomNumber(5, 20);
        const area = calculateRectangleArea(width, height);
        displayResult(`Rectangle area: ${width} × ${height} = ${area}`);
    });
    
    document.getElementById('greetBtn')?.addEventListener('click', function() {
        const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
        const times = ['morning', 'afternoon', 'evening'];
        const moods = ['wonderful', 'fantastic', 'amazing', 'productive'];
        
        const randomName = names[getRandomNumber(0, names.length - 1)];
        const randomTime = times[getRandomNumber(0, times.length - 1)];
        const randomMood = moods[getRandomNumber(0, moods.length - 1)];
        
        const greeting = createGreeting(randomName, randomTime, randomMood);
        displayResult(greeting);
    });
    
    document.getElementById('counterBtn')?.addEventListener('click', function() {
        const newValue = updateCounter();
        displayResult(`Global counter: ${newValue}`);
    });
    
    document.getElementById('privateCounterBtn')?.addEventListener('click', function() {
        // Create a new private counter each time to demonstrate closure
        const privateCounter = createPrivateCounter();
        const operations = ['increment', 'increment', 'decrement', 'increment'];
        let result = 'Private counter operations: ';
        
        operations.forEach((op, index) => {
            if (op === 'increment') {
                privateCounter.increment(getRandomNumber(1, 3));
            } else {
                privateCounter.decrement(1);
            }
            result += `${op} → ${privateCounter.getValue()}`;
            if (index < operations.length - 1) result += ' → ';
        });
        
        displayResult(result);
    });
    
    document.getElementById('validateBtn')?.addEventListener('click', function() {
        const testInputs = [
            '',
            'This is a valid input',
            'This input is way too long and should exceed the maximum allowed characters limit for validation'
        ];
        
        testInputs.forEach(input => {
            const result = validateAndProcessInput(input, 50);
            if (result.success) {
                displayResult(`Valid: "${input}" → ${result.data.words} words`, 'functionResults', 'success');
            } else {
                displayResult(`Invalid: ${result.error}`, 'functionResults', 'error');
            }
        });
    });
    
    // Part 3: Animation Controls
    document.getElementById('toggleAnimation')?.addEventListener('click', function() {
        const isNowActive = toggleAnimation('jsAnimationBox', 'active');
        displayResult(`Box animation ${isNowActive ? 'activated' : 'deactivated'}`, 'animationResults');
    });
    
    document.getElementById('resetAnimation')?.addEventListener('click', function() {
        document.getElementById('jsAnimationBox')?.classList.remove('active');
        displayResult('Box animation reset', 'animationResults', 'warning');
    });
    
    document.getElementById('randomAnimation')?.addEventListener('click', function() {
        const animationName = applyRandomAnimation('animationBox');
        if (animationName) {
            displayResult(`Applied random animation: ${animationName}`, 'animationResults', 'success');
        }
    });
    
    document.getElementById('changeColor')?.addEventListener('click', function() {
        const colors = ['#ff6b6b', '#6bff7d', '#6cd5ff', '#ffa36c', '#d66bff'];
        const currentColor = document.getElementById('colorBox')?.style.backgroundColor;
        let newColor;
        
        do {
            newColor = colors[getRandomNumber(0, colors.length - 1)];
        } while (newColor === currentColor);
        
        changeColorWithTransition('colorBox', newColor, 800)
            .then(success => {
                if (success) {
                    displayResult(`Color changed to: ${newColor}`, 'animationResults', 'success');
                }
            });
    });
    
    document.getElementById('randomColor')?.addEventListener('click', function() {
        const randomColor = getRandomColor();
        changeColorWithTransition('colorBox', randomColor, 600)
            .then(success => {
                if (success) {
                    displayResult(`Random color: ${randomColor}`, 'animationResults', 'success');
                }
            });
    });
    
    document.getElementById('animationSequence')?.addEventListener('click', function() {
        const sequence = ['pulse', 'bounce', 'rotate', 'shake', 'flip'];
        displayResult('Starting animation sequence...', 'animationResults');
        runAnimationSequence('animationBox', sequence, 1200);
    });
    
    // Modal controls
    document.getElementById('openModal')?.addEventListener('click', function() {
        toggleModal('modal', true);
        displayResult('Modal opened with animation', 'animationResults');
    });
    
    document.getElementById('closeModal')?.addEventListener('click', function() {
        toggleModal('modal', false);
        displayResult('Modal closed with animation', 'animationResults', 'warning');
    });
    
    // Loader controls
    document.getElementById('toggleLoader')?.addEventListener('click', function() {
        const loader = document.getElementById('loaderContainer');
        if (loader) {
            const isVisible = loader.style.display !== 'none';
            toggleLoader('loaderContainer', !isVisible, 'Processing your request...');
            displayResult(`Loader ${!isVisible ? 'shown' : 'hidden'}`, 'animationResults');
        }
    });
    
    // Card flip animation
    document.querySelector('.card')?.addEventListener('click', function() {
        this.classList.toggle('flipped');
        displayResult('Card flipped!', 'animationResults');
    });
    
    // Close modal when clicking outside content
    document.getElementById('modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            toggleModal('modal', false);
        }
    });
    
    // Clear results buttons
    document.getElementById('clearFunctionResults')?.addEventListener('click', function() {
        clearResults('functionResults');
    });
    
    document.getElementById('clearAnimationResults')?.addEventListener('click', function() {
        clearResults('animationResults');
    });
    
    // Display initialization message
    displayResult('Demo initialized and ready! All event listeners are active.', 'functionResults', 'success');
    displayResult('Animation system ready. Try the various animation controls!', 'animationResults', 'success');
}

// ===== INITIALIZATION =====
// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    initializeDemo();
});

// ===== EXPORTS FOR MODULE USAGE (if needed) =====
// This would be used if this file were imported as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateRectangleArea,
        createGreeting,
        updateCounter,
        createPrivateCounter,
        validateAndProcessInput,
        toggleAnimation,
        applyRandomAnimation,
        changeColorWithTransition,
        runAnimationSequence,
        toggleModal,
        toggleLoader,
        displayResult,
        clearResults,
        getRandomNumber,
        getRandomColor,
        formatMessage
    };
}