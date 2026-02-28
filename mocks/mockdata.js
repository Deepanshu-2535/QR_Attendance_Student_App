export const student = {
    rollNo: 2311113,
    firstName: "Arya",
    lastName: "Jain",
    semester: 6
}

export const subjectAttendance = [
    {
        subjectId: "CS301",
        subjectName : "DBMS",
        totalClasses : 60,
        attended:46
    },
    {
        subjectId: "CS302",
        subjectName : "OOPS",
        totalClasses : 45,
        attended: 36
    },
    {
        subjectId: "CS303",
        subjectName : "DSA",
        totalClasses : 50,
        attended: 32
    },
    {
        subjectId: "CS304",
        subjectName : "Data Science",
        totalClasses : 47,
        attended: 11
    },
    {
        subjectId: "CS305",
        subjectName : "Cloud Computing",
        totalClasses : 42,
        attended: 24
    },
]

export const detailedAttendance = [
    {
        "subjectName": "DBMS",
        "subjectId": "CS301",
        "summary": {
            "attended": 46,
            "total": 60
        },
        "history": [
            { "date": "2024-04-24", "status": "PRESENT" },
            { "date": "2024-04-23", "status": "ABSENT" },
            { "date": "2024-04-20", "status": "PRESENT" },
            { "date": "2024-04-18", "status": "PRESENT" }
        ]
    },
    {
        "subjectName": "OOPS",
        "subjectId": "CS302",
        "summary": {
            "attended": 36,
            "total": 45
        },
        "history": [
            { "date": "2024-04-25", "status": "PRESENT" },
            { "date": "2024-04-22", "status": "ABSENT" },
            { "date": "2024-04-19", "status": "PRESENT" },
            { "date": "2024-04-16", "status": "PRESENT" }
        ]
    },
    {
        "subjectName": "DSA",
        "subjectId": "CS303",
        "summary": {
            "attended": 32,
            "total": 50
        },
        "history": [
            { "date": "2024-04-26", "status": "ABSENT" },
            { "date": "2024-04-23", "status": "PRESENT" },
            { "date": "2024-04-21", "status": "PRESENT" },
            { "date": "2024-04-17", "status": "ABSENT" }
        ]
    },
    {
        "subjectName": "Data Science",
        "subjectId": "CS304",
        "summary": {
            "attended": 11,
            "total": 47
        },
        "history": [
            { "date": "2024-04-25", "status": "ABSENT" },
            { "date": "2024-04-22", "status": "ABSENT" },
            { "date": "2024-04-18", "status": "PRESENT" },
            { "date": "2024-04-14", "status": "ABSENT" }
        ]
    },
    {
        "subjectName": "Cloud Computing",
        "subjectId": "CS305",
        "summary": {
            "attended": 24,
            "total": 42
        },
        "history": [
            { "date": "2024-04-24", "status": "PRESENT" },
            { "date": "2024-04-21", "status": "PRESENT" },
            { "date": "2024-04-19", "status": "ABSENT" },
            { "date": "2024-04-15", "status": "PRESENT" }
        ]
    }

]