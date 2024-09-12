const Person = require("../models/person.models");
const Role = require("../models/role.models");



//Get All
exports.getAll = async (req, res) => {
    try {
        const people = await Person.findAll();
        // ลบฟิลด์ password ออกจากข้อมูลแต่ละรายการ
        const peopleWithoutPassword = people.map(person => {
            const { password, ...personWithoutPassword } = person.dataValues;
            return personWithoutPassword;
        });
        res.send(peopleWithoutPassword);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Person.",
        });
    }
};

//Get Person By Department
exports.getByDepartment = async (req, res) => {
    const { departmentId } = req.body;
    console.log(departmentId);
    
    try {
        const people = await Person.findAll({
            where: {
                departmentId: departmentId
            }
        });
        res.send(people);
    }  catch (err) {
        res.status(500).send({
            message: "Error retrieving people by department.",
            error: err.message
        });
    }
}

//Get Person By Role
exports.getByRole = async (req, res) => {
    const { roles } = req.body;
    
    try {
        const foundRoles = await Role.findAll({
            where: {
                name: roles
            }
        });

        if (foundRoles.length === 0) {
            return res.status(404).send({
                message: "No roles found."
            });
        }

        const roleIds = foundRoles.map(role => role.id);
        
        const people = await Person.findAll({
            include: [{
                model: Role,
                where: {
                    id: roleIds
                },
                through: {
                    attributes: []
                }
            }]
        });

        res.status(200).send(people);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving people by role.",
            error: err.message
        });
    }
};

//update Profile
exports.updateProfile = async (req, res) => {
    const id = req.params.id;
    await Person.update(req.body, {
      where: { id: id },
    })
    .then((num) => {
        if (num == 1) {
        res.send({
          message: "Profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Profile id = ${id}. Maybe Profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id,
      });
    })
}

//Delete
exports.delete = async (req, res) => {
    const id = req.params.id;
    await Person.destroy({
      where: { id: id },
    })
    .then((num)=>{
        if (num == 1) {
            res.send({
          message: "Profile was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`,
        });
        }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id,
      });
    })
}