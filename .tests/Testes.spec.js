import { describe, expect, it, test } from 'vitest'
import { mount} from '@vue/test-utils'
import Login from '../pages/index.vue'
import SignIn from  '../pages/sign-in.vue'
import Tasks from '../pages/tasks.vue'
import { PrismaClient } from '@prisma/client'

describe('Testar Paginas', () => {
    it('Pode Acessar Login', () => {
        const wrapper = mount(Login)
        expect(wrapper.html()).toMatchSnapshot()
    })
    it('Pode Acessar SignIn', () => {
        const wrapper = mount(SignIn)
        expect(wrapper.html()).toMatchSnapshot()
    })
    it('Pode Acessar tasks', () => {
        const wrapper = mount(Tasks)
        expect(wrapper.html()).toMatchSnapshot()
    })
})

describe('Testar API', () => {
    test('Pode Criar Usuario', async () => {
        const prisma = new PrismaClient()
        const name =  Math.random().toString(36).substring(7);
        const email =  Math.random().toString(36).substring(7) + '@gmail.com';
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: '123456'
            }
        })
        expect(user.name).toBe(name)
        expect(user.email).toBe(email)
        expect(user.password).toBe('123456')
        await prisma.users.delete({
            where: { id: user.id },
        })
    })
    test('Pode Criar Tarefa', async () => {
        const prisma = new PrismaClient()
        const task = await prisma.task.create({
            data: {
                title: 'Teste1',
                content: 'Teste1',
                status: 1,
                userId: 1
            }
        })
        expect(task.title).toBe('Teste1')
        expect(task.content).toBe('Teste1')
        expect(task.userId).toBe(1)
        await prisma.task.delete({
            where: { id: task.id },
        })
    })
    test('Pode Atualizar Tarefa', async () => {
        const prisma = new PrismaClient()
        const task = await prisma.task.create({
            data: {
                title: 'Teste1',
                content: 'Teste1',
                status: 1,
                userId: 1
            }
        })
        const task2 = await prisma.task.update({
            where: { id: task.id },
            data: { title: 'Teste2', status: 2 },
        })

        expect(task2.title).toBe('Teste2')
        expect(task2.content).toBe('Teste1')
        expect(task2.userId).toBe(1)
        await prisma.task.delete({
            where: { id: task.id },
        })
    }
    )
    test('Pode Deletar Tarefa', async () => {
        const prisma = new PrismaClient()
        const task = await prisma.task.create({
            data: {
                title: 'Teste1',
                content: 'Teste1',
                status: 1,
                userId: 1
            }
        })
        await prisma.task.delete({
            where: { id: task.id },
        })
    }
    )
})

