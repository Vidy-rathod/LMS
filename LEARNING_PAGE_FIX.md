# Learning Page Data Fix

## Issue
The learning page was displaying lessons in incorrect order, mixing lessons from different sections.

## Root Cause
Lessons were being sorted only by their `orderNumber` field, which caused lessons from different sections to be interleaved. For example:
- Section 1, Lesson 1 (orderNumber: 1)
- Section 2, Lesson 1 (orderNumber: 1)
- Section 1, Lesson 2 (orderNumber: 2)
- Section 2, Lesson 2 (orderNumber: 2)

## Solution
Updated the `fetchCourseData` function in `LearningPage.jsx` to:

1. **Sort sections first** by their `orderNumber`
2. **Sort lessons** by:
   - First: Section order (which section they belong to)
   - Second: Lesson orderNumber within that section

This ensures lessons are displayed in the correct sequence:
- Section 1, Lesson 1
- Section 1, Lesson 2
- Section 1, Lesson 3
- Section 2, Lesson 1
- Section 2, Lesson 2
- etc.

## Changes Made

### File: `frontend/src/pages/LearningPage.jsx`

```javascript
const fetchCourseData = async () => {
  try {
    const { data } = await api.get(`/courses/${courseId}`);
    setCourse(data.course);
    
    // Sort sections by orderNumber
    const sortedSections = data.sections.sort((a, b) => a.orderNumber - b.orderNumber);
    setSections(sortedSections);
    
    // Sort lessons: first by section order, then by lesson orderNumber
    const sortedLessons = data.lessons.sort((a, b) => {
      const sectionA = sortedSections.find(s => s._id === a.sectionId);
      const sectionB = sortedSections.find(s => s._id === b.sectionId);
      
      const sectionOrderA = sectionA ? sectionA.orderNumber : 999;
      const sectionOrderB = sectionB ? sectionB.orderNumber : 999;
      
      // First sort by section order
      if (sectionOrderA !== sectionOrderB) {
        return sectionOrderA - sectionOrderB;
      }
      
      // Then sort by lesson order within the section
      return a.orderNumber - b.orderNumber;
    });
    
    setLessons(sortedLessons);
    // ... rest of the code
  }
};
```

## Result
✅ Lessons now display in correct order
✅ Next/Previous buttons navigate through lessons sequentially
✅ Sidebar shows lessons grouped by section correctly
✅ Progress tracking works accurately

## Testing
1. Navigate to any course learning page
2. Verify lessons are in correct order in the sidebar
3. Click Next/Previous buttons to navigate
4. Confirm video descriptions match the current lesson
5. Check that progress percentage updates correctly
