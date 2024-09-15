const Task = require("../model/taskModel");

async function TaskTeamViewController(req, res) {
  const { teamID, status } = req.body;
  if (teamID === "") {
    return res.status(404).send({ message: "Task ID not Selected" });
  }
  try {
    if (status === "firstView") {
      const startDate = new Date();
      const teamsView = await Task.findOne({
        "assignedTo._id": teamID,
        "assignedTo.assignStart": null,
      });
      if (teamsView) {
        await Task.findOneAndUpdate(
          { "assignedTo._id": teamID, "assignedTo.assignStart": null },
          {
            $set: {
              "assignedTo.$.assignedStatus": "ongoing",
              "assignedTo.$.assignStart": startDate,
            },
          },
          { new: true }
        );
        res.status(200).send({ message: "View Updated" });
      } else {
        res.status(401).send({ message: "Already Viewed" });
      }
    }

    if (status === "review") {
      const reviewDate = new Date();
      const teamsView = await Task.findOne({
        "assignedTo._id": teamID,
      });
      if (teamsView) {
        await Task.findOneAndUpdate(
          { "assignedTo._id": teamID },
          {
            $set: {
              "assignedTo.$.assignedStatus": "submit",
              "assignedTo.$.assignSubmit": reviewDate,
            },
          },
          { new: true }
        );
        res.status(200).send({ message: "Task Submited" });
      } else {
        res.status(401).send({ message: "Not Submitted" });
      }
    }

    if (status === "done") {
      const acceptDate = new Date();
      const teamsView = await Task.findOne({
        "assignedTo._id": teamID,
      });
      if (teamsView) {
        await Task.findOneAndUpdate(
          { "assignedTo._id": teamID },
          {
            $set: {
              "assignedTo.$.assignedStatus": "done",
              "assignedTo.$.assignAccept": acceptDate,
            },
          },
          { new: true }
        ).then(async (acceptRes) => {
          const acceptCkArr = [];

          acceptRes.assignedTo.map((acceptCk) => {
            if (acceptCk.assignedStatus !== "done") {
              acceptCkArr.push(acceptCk.assignedToID);
            }
          });

          if (acceptCkArr.length === 0) {
            const doneDate = new Date();
            await Task.findByIdAndUpdate(
              acceptRes._id,
              {
                $set: {
                  taskStatus: "done",
                  taskComplete: doneDate,
                },
              },
              { new: true }
            );
          }
        });
        res.status(200).send({ message: "Task Complete" });
      } else {
        res.status(401).send({ message: "Not Complete" });
      }
    }
    if (status === "review") {
      const teamsView = await Task.findOne({
        "assignedTo._id": teamID,
      });
      if (teamsView) {
        await Task.findOneAndUpdate(
          { "assignedTo._id": teamID },
          {
            $set: {
              "assignedTo.$.assignedStatus": "review",
              "assignedTo.$.assignAccept": null,
            },
          },
          { new: true }
        ).then(async (acceptRes) => {
          await Task.findByIdAndUpdate(
            acceptRes._id,
            {
              $set: {
                taskStatus: "ongoing",
                taskComplete: null,
              },
            },
            { new: true }
          );
        });
        res.status(200).send({ message: "Task under review" });
      } else {
        res.status(401).send({ message: "Not under review" });
      }
    }

    // const teamView = await Task.findOneAndUpdate(
    //   { "assignedTo._id": teamID, "assignedTo.assignStart": null },
    //   {
    //     $set: {
    //       "assignedTo.$.assignedStatus": "ongoing",
    //       "assignedTo.$.assignStart": startDate,
    //     },
    //   },
    //   { new: true }
    // );
  } catch (error) {
    res.status(401).send(error);
  }
}
module.exports = TaskTeamViewController;
