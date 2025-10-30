using Microsoft.AspNetCore.Mvc;
using TaskManagement.Models;
using TaskManagement.Services;

namespace TaskManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(_taskService.GetAllTasks());
        }

        [HttpPost]
        public ActionResult<TaskItem> AddTask([FromBody] TaskItem task)
        {
            var newTask = _taskService.AddTask(task);
            return CreatedAtAction(nameof(GetTasks), new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id}")]
        public ActionResult<TaskItem> UpdateTask(Guid id, [FromBody] TaskItem task)
        {
            var updatedTask = _taskService.UpdateTask(id, task);
            if (updatedTask == null)
            {
                return NotFound();
            }
            return Ok(updatedTask);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            _taskService.DeleteTask(id);
            return NoContent();
        }
    }
}
