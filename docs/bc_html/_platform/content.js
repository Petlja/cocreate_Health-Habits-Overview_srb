var c_API;

function createAccessibilityPanel() {
    if (document.getElementById('accessibility-panel'))
        return;

    // Drawer toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'accessibility-toggle';
    toggleBtn.setAttribute('aria-label', 'Show accessibility controls');
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '1.2rem';
    toggleBtn.style.right = '1.2rem';
    toggleBtn.style.width = '44px';
    toggleBtn.style.height = '44px';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.background = 'rgba(34,34,34,0.92)';
    toggleBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.18)';
    toggleBtn.style.border = 'none';
    toggleBtn.style.zIndex = '100000';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.display = 'flex';
    toggleBtn.style.alignItems = 'center';
    toggleBtn.style.justifyContent = 'center';
    toggleBtn.style.fontSize = '1.3rem';
    toggleBtn.style.color = '#fff';
    toggleBtn.style.transition = 'background 0.18s, box-shadow 0.18s';
    toggleBtn.innerHTML = 'A';
    document.body.appendChild(toggleBtn);

    // Drawer panel
    const panel = document.createElement('div');
    panel.id = 'accessibility-panel';
    panel.style.position = 'fixed';
    panel.style.top = '64px';
    panel.style.right = '0.7rem';
    panel.style.maxWidth = '180px';
    panel.style.padding = '7px 10px';
    panel.style.background = 'rgba(240, 240, 240, 0.92)';
    panel.style.borderRadius = '14px';
    panel.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
    panel.style.color = '#222';
    panel.style.zIndex = '99999';
    panel.style.opacity = '0.98';
    panel.style.transition = 'opacity 0.24s ease, transform 0.24s ease';
    panel.style.backdropFilter = 'blur(6px)';
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    panel.style.gap = '7px';
    panel.style.fontFamily = 'sans-serif';
    panel.style.transform = 'translateY(-30px) scale(0.95)';
    panel.style.pointerEvents = 'none';
    panel.style.visibility = 'hidden';
    panel.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; gap:10px;">
            <button type="button" id="fontSizeSmall" aria-label="Small font" title="Small" style="transition:all 0.18s; background:rgba(255,255,255,0.45); color:#222; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; padding:0.32rem 0.7rem; cursor:pointer; outline:none;">A</button>
            <button type="button" id="fontSizeMedium" aria-label="Medium font" title="Medium" style="transition:all 0.18s; background:rgba(255,255,255,0.45); color:#222; border:none; border-radius:10px; font-size:1.15rem; font-weight:700; padding:0.42rem 0.9rem; cursor:pointer; outline:none;">A</button>
            <button type="button" id="fontSizeLarge" aria-label="Large font" title="Large" style="transition:all 0.18s; background:rgba(255,255,255,0.45); color:#222; border:none; border-radius:10px; font-size:1.35rem; font-weight:700; padding:0.52rem 1.1rem; cursor:pointer; outline:none;">A</button>
        </div>
    `;
    document.body.appendChild(panel);

    // Drawer open/close logic
    let drawerOpen = false;
    function openDrawer() {
        panel.style.transform = 'translateY(0) scale(1)';
        panel.style.pointerEvents = 'auto';
        panel.style.visibility = 'visible';
        panel.style.opacity = '0.98';
        toggleBtn.style.background = 'rgba(60,60,60,0.85)';
        toggleBtn.style.color = '#fff';
        drawerOpen = true;
    }
    function closeDrawer() {
        panel.style.transform = 'translateY(-30px) scale(0.95)';
        panel.style.pointerEvents = 'none';
        panel.style.visibility = 'hidden';
        panel.style.opacity = '0.7';
        toggleBtn.style.background = 'rgba(240,240,240,0.92)';
        toggleBtn.style.color = '#222';
        drawerOpen = false;
    }
    toggleBtn.addEventListener('click', () => {
        if (drawerOpen) closeDrawer();
        else openDrawer();
    });
    // Close drawer on outside click
    document.addEventListener('mousedown', (e) => {
        if (drawerOpen && !panel.contains(e.target) && e.target !== toggleBtn) {
            closeDrawer();
        }
    });
    const fontSteps = [0, 3, 5];
    let currentStep = 0; 

    const btnSmall = panel.querySelector('#fontSizeSmall');
    const btnMedium = panel.querySelector('#fontSizeMedium');
    const btnLarge = panel.querySelector('#fontSizeLarge');

    const buttons = [btnSmall, btnMedium, btnLarge];

    function updateButtonStyles(selectedIdx) {
        buttons.forEach((btn, idx) => {
            if (idx === selectedIdx) {
                btn.style.background = 'rgba(60,60,60,0.85)';
                btn.style.color = '#fff';
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = '0 2px 8px rgba(60,60,60,0.13)';
            } else {
                btn.style.background = 'rgba(255,255,255,0.45)';
                btn.style.color = '#222';
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = 'none';
            }
        });
    }

    function setFontStep(idx) {
        const delta = fontSteps[idx] - fontSteps[currentStep];
        if (delta !== 0) {
            changeFontSize(document.body, delta);
            currentStep = idx;
        }
        updateButtonStyles(idx);
    }

    btnSmall.addEventListener('click', () => setFontStep(0));
    btnMedium.addEventListener('click', () => setFontStep(1));
    btnLarge.addEventListener('click', () => setFontStep(2));

    // Set initial style
    updateButtonStyles(0);

    function applyPanelOpacity(opacity) {
        panel.style.opacity = opacity;
    }

    let fadeTimeout = null;
    window.addEventListener('scroll', function () {
        if (!drawerOpen) return;
        applyPanelOpacity(0.45);
        if (fadeTimeout)
            clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => applyPanelOpacity(0.98), 1200);
    });

    panel.addEventListener('mouseenter', function () {
        applyPanelOpacity(0.98);
        if (fadeTimeout)
            clearTimeout(fadeTimeout);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    createAccessibilityPanel();
    if (!window.PetljaRT)
        return;
    c_API = new ContentPage(window.PetljaRT);
});

document.addEventListener("click", function(e) {
    if (e.target.tagName == "IMG")
    {
        if(e.target.parentNode && e.target.parentNode.tagName =="A")
            e.target.parentNode.setAttribute("target", "_blank");
    }
    if (e.target.tagName == "A")
    {
        if (e.target.getAttribute("href") && e.target.getAttribute("href").startsWith("http"))
            e.target.setAttribute("target", "_blank");
    }
});

function ContentPage(PetljaRT){
    this.isActivityDone = false;
    this.PetljaRT = PetljaRT;
    this.mainDiv = document.getElementsByClassName('body')[0];
    
    document.documentElement.style.overflow = 'hidden';

    this.PetljaRT.registerContent(window.location.href);
    this.PetljaRT.addContentSettingHandler((contentSettings) => {this.setupPage(contentSettings)});
    this.PetljaRT.addFontSizeHandler((zoomFactor) => {this.changeFontSizeWrapper(zoomFactor)});
    // make a more general handler for this
    this.PetljaRT.registerActivityProgress({
        'progressStatus' :true,
        'score' : 1,
        'maxScore' : 1,
        'lectureType' : 'other'
    });

    
    window.addEventListener("load", () =>{
        this.contentHeight = Math.round(this.mainDiv.scrollHeight + 100);
        this.PetljaRT.registerContentHeight(this.contentHeight);

    });

    new ResizeObserver(() => {
        this.contentHeight = Math.round(this.mainDiv.scrollHeight + 100);
        this.PetljaRT.registerContentHeight(this.contentHeight);
    }).observe(this.mainDiv);

}


ContentPage.prototype.changeFontSizeWrapper = function(zoomFactor){
    changeFontSize(document.body, zoomFactor);
}

ContentPage.prototype.setupPage = function(contentSettings){
    this.changeFontSizeWrapper(contentSettings.contentZoomFactor);
}

function changeFontSize(node, zoomFactor) {
    node.childNodes.forEach(child => {
        if(child.nodeType != Node.TEXT_NODE){
            changeFontSize(child, zoomFactor);
            var currentFontSize = parseFloat(window.getComputedStyle(child, null).getPropertyValue("font-size"));
            if (!isNaN(currentFontSize)) {
                child.style.fontSize = (currentFontSize + zoomFactor).toString() + "px";
            }
        }
    });
};
