import { ErrorNotification } from "@/utils/toast";
import { scenarios, formatCurrency, formatNumber } from "./index";





export const generatePDF = (leadData: any, metrics: any, results: any, scenario: string) => {
    // Create McKinsey/Deloitte-level professional landscape PDF
    const canvas = document.createElement('canvas');
    canvas.width = 1200; // 12" x 8.5" at 100 DPI for landscape
    canvas.height = 850;
    const ctx = canvas.getContext('2d');

    // Brand colors from guidelines - only blues, cyans, teals
    const brandColors = {
        primaryDarkBlue: '#0a2240',
        electricBlue: '#1e90ff',
        cyanAccent: '#4fc3f7',
        tealSupport: '#00bcd4',
        warmWhite: '#fefefe',
        charcoal: '#2c3e50',
        slateGray: '#64748b',
        lightGray: '#f8fafc'
    };


    if (!ctx) {
        console.error('Canvas context not found');
        ErrorNotification('Error generating PDF, Please try again later');
        return;
    }

    // Clean white background
    ctx.fillStyle = brandColors.warmWhite;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Professional header with subtle gradient
    const headerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    headerGradient.addColorStop(0, brandColors.primaryDarkBlue);
    headerGradient.addColorStop(1, brandColors.electricBlue);
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, canvas.width, 100);

    // Load and draw Affiniti logo
    const logoImg = new Image();
    logoImg.onload = () => {
        // Draw logo in top left
        ctx.drawImage(logoImg, 40, 20, 120, 60);

        // Continue with rest of PDF generation after logo loads
        finishPDFGeneration();
    };
    logoImg.src = '/affiniti-logo.png';

    const finishPDFGeneration = () => {
        // Main title - centered
        ctx.fillStyle = brandColors.warmWhite;
        ctx.font = 'bold 32px Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('EXECUTIVE IMPACT ANALYSIS', canvas.width / 2, 65);

        // Subtitle
        ctx.font = '16px Inter, Arial, sans-serif';
        ctx.fillText('DeepTrust OS+AI Strategic Assessment', canvas.width / 2, 85);

        // Executive information section - clean layout
        ctx.fillStyle = brandColors.charcoal;
        ctx.font = 'bold 16px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';

        // Left column - Executive info
        ctx.fillText('EXECUTIVE:', 60, 140);
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillText(`${leadData.name}, ${leadData.title}`, 60, 160);

        ctx.font = 'bold 16px Inter, Arial, sans-serif';
        ctx.fillText('ORGANIZATION:', 60, 190);
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillText(leadData.company, 60, 210);

        // Right column - Analysis info
        ctx.font = 'bold 16px Inter, Arial, sans-serif';
        ctx.fillText('ANALYSIS DATE:', 600, 140);
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 600, 160);

        ctx.font = 'bold 16px Inter, Arial, sans-serif';
        ctx.fillText('SCENARIO MODEL:', 600, 190);
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillText((scenarios as any)[scenario].label.toUpperCase(), 600, 210);

        // Divider line
        ctx.strokeStyle = brandColors.slateGray;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(60, 240);
        ctx.lineTo(canvas.width - 60, 240);
        ctx.stroke();

        // Three-section layout with proper spacing
        const sectionWidth = 350;
        const sectionHeight = 420;
        const startY = 280;
        const spacing = 25;

        // Section 1: Current Performance (Slate theme)
        ctx.fillStyle = brandColors.lightGray;
        ctx.fillRect(60, startY, sectionWidth, sectionHeight);
        ctx.strokeStyle = brandColors.slateGray;
        ctx.lineWidth = 2;
        ctx.strokeRect(60, startY, sectionWidth, sectionHeight);

        ctx.fillStyle = brandColors.slateGray;
        ctx.font = 'bold 18px Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CURRENT PERFORMANCE', 60 + sectionWidth / 2, startY + 35);

        // Current metrics
        ctx.fillStyle = brandColors.charcoal;
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        let yPos = startY + 70;
        ctx.fillText(`Annual Leads: ${formatNumber(metrics.currentLeads[0])}`, 80, yPos);
        ctx.fillText(`Conversion Rate: ${metrics.currentConversionRate[0]}%`, 80, yPos + 30);
        ctx.fillText(`Sales Cycle: ${metrics.currentSalesCycle[0]} months`, 80, yPos + 60);
        ctx.fillText(`Average Deal Size: ${formatCurrency(metrics.currentDealSize[0])}`, 80, yPos + 90);

        // Results section
        ctx.fillStyle = brandColors.slateGray;
        ctx.font = 'bold 16px Inter, Arial, sans-serif';
        ctx.fillText('ANNUAL RESULTS:', 80, yPos + 140);

        ctx.fillStyle = brandColors.charcoal;
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillText(`Closed Deals: ${formatNumber(results.current.deals)}`, 80, yPos + 170);
        ctx.fillText('Total Revenue:', 80, yPos + 200);

        ctx.font = 'bold 24px Inter, Arial, sans-serif';
        ctx.fillStyle = brandColors.slateGray;
        ctx.fillText(`${formatCurrency(results.current.revenue)}`, 80, yPos + 230);

        // Section 2: DeepTrust Performance (Blue theme)
        ctx.fillStyle = '#f0f9ff'; // Light blue background
        ctx.fillRect(60 + sectionWidth + spacing, startY, sectionWidth, sectionHeight);
        ctx.strokeStyle = brandColors.electricBlue;
        ctx.lineWidth = 2;
        ctx.strokeRect(60 + sectionWidth + spacing, startY, sectionWidth, sectionHeight);

        ctx.fillStyle = brandColors.electricBlue;
        ctx.font = 'bold 18px Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('DEEPTRUST OS+AI', 60 + sectionWidth + spacing + sectionWidth / 2, startY + 35);

        // DeepTrust metrics
        ctx.fillStyle = brandColors.charcoal;
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        yPos = startY + 70;
        const xPos2 = 80 + sectionWidth + spacing;
        ctx.fillText(`Enhanced Close Rate: ${results.deepTrust.closeRate}%`, xPos2, yPos);
        ctx.fillText(`Accelerated Cycle: ${results.deepTrust.cycle} months`, xPos2, yPos + 30);
        ctx.fillText(`Increased Deal Size: ${formatCurrency(results.deepTrust.dealSize)}`, xPos2, yPos + 60);
        ctx.fillText(`Scenario: ${(scenarios as any)[scenario].label}`, xPos2, yPos + 90);

        // Projected results
        ctx.fillStyle = brandColors.electricBlue;
        ctx.font = 'bold 16px Inter, Arial, sans-serif';
        ctx.fillText('PROJECTED RESULTS:', xPos2, yPos + 140);

        ctx.fillStyle = brandColors.charcoal;
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillText(`Closed Deals: ${formatNumber(results.deepTrust.deals)}`, xPos2, yPos + 170);
        ctx.fillText('Total Revenue:', xPos2, yPos + 200);

        ctx.font = 'bold 24px Inter, Arial, sans-serif';
        ctx.fillStyle = brandColors.electricBlue;
        ctx.fillText(`${formatCurrency(results.deepTrust.revenue)}`, xPos2, yPos + 230);

        // Section 3: Impact Analysis (Cyan theme)
        ctx.fillStyle = '#f0fdfa'; // Light cyan background
        ctx.fillRect(60 + (sectionWidth + spacing) * 2, startY, sectionWidth, sectionHeight);
        ctx.strokeStyle = brandColors.cyanAccent;
        ctx.lineWidth = 2;
        ctx.strokeRect(60 + (sectionWidth + spacing) * 2, startY, sectionWidth, sectionHeight);

        ctx.fillStyle = brandColors.cyanAccent;
        ctx.font = 'bold 18px Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('STRATEGIC IMPACT', 60 + (sectionWidth + spacing) * 2 + sectionWidth / 2, startY + 35);

        // Large ROI percentage
        ctx.fillStyle = brandColors.tealSupport;
        ctx.font = 'bold 64px Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${results.impact.roi}%`, 60 + (sectionWidth + spacing) * 2 + sectionWidth / 2, startY + 130);

        ctx.font = 'bold 14px Inter, Arial, sans-serif';
        ctx.fillText('ROI IMPROVEMENT', 60 + (sectionWidth + spacing) * 2 + sectionWidth / 2, startY + 150);

        // Impact metrics
        ctx.fillStyle = brandColors.charcoal;
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        yPos = startY + 190;
        const xPos3 = 80 + (sectionWidth + spacing) * 2;
        ctx.fillText('Additional Revenue:', xPos3, yPos);

        ctx.font = 'bold 20px Inter, Arial, sans-serif';
        ctx.fillStyle = brandColors.tealSupport;
        ctx.fillText(`${formatCurrency(results.impact.revenue)}`, xPos3, yPos + 25);

        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillStyle = brandColors.charcoal;
        ctx.fillText(`Additional Deals: +${formatNumber(results.impact.deals)}`, xPos3, yPos + 65);
        ctx.fillText(`Time Savings: -${results.impact.cycle} months per deal`, xPos3, yPos + 95);

        // Executive Summary Footer
        ctx.fillStyle = brandColors.lightGray;
        ctx.fillRect(60, 720, canvas.width - 120, 80);
        ctx.strokeStyle = brandColors.slateGray;
        ctx.lineWidth = 1;
        ctx.strokeRect(60, 720, canvas.width - 120, 80);

        ctx.fillStyle = brandColors.primaryDarkBlue;
        ctx.font = 'bold 16px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('EXECUTIVE SUMMARY', 80, 745);

        ctx.font = '12px Inter, Arial, sans-serif';
        ctx.fillStyle = brandColors.charcoal;
        const summaryText = `Implementation of DeepTrust OS+AI could generate ${formatCurrency(results.impact.revenue)} in additional annual revenue through ${formatNumber(results.impact.deals)} additional closed deals, with sales cycles accelerated by ${results.impact.cycle} months. This represents a ${results.impact.roi}% improvement in ROI based on ${(scenarios as any)[scenario].label.toLowerCase()} projections.`;

        // Word wrap for summary
        const maxWidth = canvas.width - 160;
        const words = summaryText.split(' ');
        let line = '';
        let y = 765;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, 80, y);
                line = words[n] + ' ';
                y += 16;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 80, y);

        // Convert canvas to image and download
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `DeepTrust-Executive-Impact-Analysis-${leadData.company.replace(/\s+/g, '-')}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        }, 'image/png');
    };
};
