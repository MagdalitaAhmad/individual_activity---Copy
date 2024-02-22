const express = require('express');
const app = express();
const mongoose = require('mongoose');
const courseSchema = require('./modules/courseModel');

app.get('/', (req, res) => {
    res.send("Welcome to the root route of the api");
});

//get all course by alphabetical
app.get("/courses/getCoursesSortedByName", async (req, res) => {
    try {
      const years = await courseSchema.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      courses.sort((a, b) => a.description.localeCompare(b.description));
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// get name and specialization of each course
app.get("/courses/getCoursesNameAndSpecialization", async (req, res) => {
    try {
      const years = await courseSchema.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      const descriptionsAndTags = courses.map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
      res.json(descriptionsAndTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// -get all published BSIS (Bachelor of Science in Information Systems) and BSIT (Bachelor of Science in Information Technology) courses from the curriculum.

app.get("/courses/getPublishedCourses", async (req, res) => {
    try {
      const years = await courseSchema.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      const descriptionsAndTags = courses
        .filter(
          (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
        )
        .map((course) => ({
          description: course.description,
          tags: course.tags,
        }));
      res.json(descriptionsAndTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  



mongoose.connect('mongodb://localhost:27017/mongo-tests')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// mongoose
//     .connect("mongodb://localhost:27017/mongo-tests").then(()=>{
//         cons
// })

