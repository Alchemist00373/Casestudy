async function loadCalendar() {
  try {
    const year = new Date().getFullYear();
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/PH`);
    const holidays = await response.json();
    
    const container = document.getElementById('calendar-container');
    
    const today = new Date();
    const upcomingHolidays = holidays
      .filter(h => new Date(h.date) >= today)
      .slice(0, 5);
    
    let html = '<div class="calendar-grid">';
    
    upcomingHolidays.forEach(holiday => {
      const date = new Date(holiday.date);
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      
      html += `
        <div class="holiday-item">
          <strong class="holiday-name">${holiday.localName}</strong><br>
          <span class="holiday-date">${formattedDate}</span>
        </div>
      `;
    });
    
    html += '</div>';
    html += `<p class="calendar-footer">
      Data from Nager.Date Public Holiday API
    </p>`;
    
    container.innerHTML = html;
  } catch (error) {
    document.getElementById('calendar-container').innerHTML = 
      '<p class="calendar-error">Unable to load holidays</p>';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCalendar);
} else {
  loadCalendar();
}