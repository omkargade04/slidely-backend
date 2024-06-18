const fs = require("fs");

export const pingCall = async (req: Request, res: any) => {
  try {
    res.status(200).send("True");
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const formSubmission = async (req: Request, res: any) => {
  try {
    let userId = 0;
    const newSubmission = req.body;

    userId += 1;

    fs.readFile("db.json", "utf8", (err: any, data: any) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: false, message: "Error reading database file" });
      }

      let submissions = JSON.parse(data || "[]");
      submissions.push(newSubmission);
      submissions.push(userId);

      fs.writeFile(
        "db.json",
        JSON.stringify(submissions, null, 2),
        (err: any) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              status: false,
              message: "Error writing to database file",
            });
          }

          res
            .status(200)
            .json({ status: true, message: "Submission received" });
        }
      );
    });
  } catch (err: any) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getResult = async (req: any, res: any) => {
  try {
    const index = parseInt(req.query.index, 10);

    if (isNaN(index)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid index parameter" });
    }

    fs.readFile("db.json", "utf8", (err: any, data: any) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: false, message: "Error reading database file" });
      }

      let submissions = JSON.parse(data || "[]");

      if (index < 0 || index >= submissions.length) {
        return res
          .status(404)
          .json({ status: false, message: "Submission not found" });
      }

      res.status(200).json({
        status: true,
        data: submissions[index],
        message: "Data retrieved successfully3",
      });
    });
  } catch (err: any) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const searchByEmail = async (req: any, res: any) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Email query parameter is required" });
    }

    fs.readFile("db.json", "utf8", (err: any, data: any) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: false, message: "Error reading database file" });
      }

      let submissions = JSON.parse(data || "[]");
      const results = submissions.filter(
        (submission: any) => submission.email === email
      );

      if (results.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No submissions found for the given email",
        });
      }

      res.status(200).json({
        status: true,
        data: results,
        message: "Data via email fetched",
      });
    });
  } catch (err: any) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const editData = async (req: any, res: any) => {
  try {
    const index = parseInt(req.body.index, 10);
    const updatedSubmission = req.body.updatedSubmission;

    if (isNaN(index)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid index parameter" });
    }

    if (!updatedSubmission) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Updated submission data is required",
        });
    }

    fs.readFile("db.json", "utf8", (err: any, data: any) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: false, message: "Error reading database file" });
      }

      let submissions = JSON.parse(data || "[]");

      if (index < 0 || index >= submissions.length) {
        return res
          .status(404)
          .json({ status: false, message: "Submission not found" });
      }

      submissions[index] = updatedSubmission;

      fs.writeFile(
        "db.json",
        JSON.stringify(submissions, null, 2),
        (err: any) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({
                status: false,
                message: "Error writing to database file",
              });
          }

          res
            .status(200)
            .json({ status: true, message: "Submission updated successfully" });
        }
      );
    });
  } catch (err: any) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const deleteData = async (req: any, res: any) => {
  try {
    const index = parseInt(req.body.index, 10);

    if (isNaN(index)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid index parameter" });
    }

    fs.readFile("db.json", "utf8", (err: any, data: any) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: false, message: "Error reading database file" });
      }

      let submissions = JSON.parse(data || "[]");

      if (index < 0 || index >= submissions.length) {
        return res
          .status(404)
          .json({ status: false, message: "Submission not found" });
      }

      submissions.splice(index, 1);

      fs.writeFile(
        "db.json",
        JSON.stringify(submissions, null, 2),
        (err: any) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({
                status: false,
                message: "Error writing to database file",
              });
          }

          res
            .status(200)
            .json({
              status: false,
              message: "Submission deleted successfully",
            });
        }
      );
    });
  } catch (err: any) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
