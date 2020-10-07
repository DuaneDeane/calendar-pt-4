class Task {

    // initialize elements
    constructor(title, important, dueDate, description, alertText, location) {
        this.title = title;
        this.important = important;
        
        this.dueDate = dueDate;
        this.description = description;
        this.alertText = alertText;
        this.location = location;

        this.user = 'Duane';
        this.createdOn = new Date(); // current date and time
    }
}

/**
 *
 * create an object
 * console log the object
 * 
 */