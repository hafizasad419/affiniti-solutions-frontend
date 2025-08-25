export const scrollToElement = (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    } else {
        // If element is not found, try again after a short delay
        // This handles cases where the page is still loading
        setTimeout(() => {
            const retryElement = document.getElementById(elementId);
            if (retryElement) {
                retryElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 200);
    }
};

export const scrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
