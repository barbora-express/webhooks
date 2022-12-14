export const OrderStatus = {
	CREATED: 'CREATED',
	PRIORITY: 'PRIORITY',
	PLANNED: 'PLANNED',
	NEED_COURIER: 'NEED_COURIER',
	COURIER_MISSING: 'COURIER_MISSING',
	ACTIVE: 'ACTIVE',
	STARTED: 'STARTED',
	COMPLETED: 'COMPLETED',
	FAILED: 'FAILED',
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]
export type EventType = OrderStatus

export const TaskStatus = {
	UNASSIGNED: 'UNASSIGNED',
	ASSIGNED: 'ASSIGNED',
	ACTIVE: 'ACTIVE',
	STARTED: 'STARTED',
	COMPLETED: 'COMPLETED',
	FAILED: 'FAILED',
}

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]

export const TaskType = {
	PICKUP: 'PICKUP',
	DROP_OFF: 'DROP_OFF',
}

export type TaskType = typeof TaskType[keyof typeof TaskType]

export interface WebhookTask {
	id: number
	taskType: TaskType
	status: TaskStatus
	eta?: {
		initial: { arrival: number }
		current: { arrival: number }
	}
	address: {
		address: string
		coordinates: number[]
		contactPhone: string
		contactName: string
		notes?: string
	}
}

export interface WebhookOrder {
	id: string
	organizationId: string
	status: OrderStatus
	createdAt: number
	startAfter?: number
	startedAt?: number
	merchantOrderId: string
	courierId?: number
	completedAt?: number
	eta?: {
		initial: {
			arrival: number
		}
		current: {
			arrival: number
		}
	}
	failedAt?: number
	failureReason?: string
	failureNote?: string
	tasks: {
		pickup: WebhookTask
		dropOff: WebhookTask
	}
	stickerLink: string | null
}

export interface Payload {
	namespace: 'ORDER'
	type: EventType
	data: {
		organization: {
			id: string
		}
		order: WebhookOrder
	}
}

export type OrderWebhook = {
	id: string
	groupId: string
	environment: string
	payload: Payload
	webhookId: string
	timestamp: number
}
